// src/app/api/lead/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().email().max(254),
  brief: z.string().min(5).max(1200),
});

const MAX_FILE_BYTES = 3 * 1024 * 1024; // 3MB
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

function safeText(input: string): string {
  return input.replace(/\u0000/g, "").replace(/\r/g, " ").trim();
}

function getRequiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function escapeHtml(str: string): string {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const GMAIL_USER = getRequiredEnv("GMAIL_USER");
    const GMAIL_APP_PASSWORD = getRequiredEnv("GMAIL_APP_PASSWORD");
    const LEADS_TO_EMAIL = getRequiredEnv("LEADS_TO_EMAIL");
    const FROM_EMAIL = getRequiredEnv("FROM_EMAIL");

    const form = await req.formData();

    const emailRaw = String(form.get("email") ?? "");
    const briefRaw = String(form.get("brief") ?? "");

    const parsed = schema.safeParse({ email: emailRaw, brief: briefRaw });
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email and a short brief." },
        { status: 400 }
      );
    }

    const leadEmail = safeText(parsed.data.email);
    const brief = parsed.data.brief.trim();

    const file = form.get("image");
    const attachments: Array<{
      filename: string;
      content: Buffer;
      contentType: string;
    }> = [];

    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { ok: false, error: "Image is too large. Max 3MB." },
          { status: 400 }
        );
      }
      if (!ALLOWED_MIME.has(file.type)) {
        return NextResponse.json(
          { ok: false, error: "Unsupported image format. Use JPG, PNG, or WebP." },
          { status: 400 }
        );
      }

      const buf = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: safeText(file.name || "reference"),
        content: buf,
        contentType: file.type,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    await transporter.verify();

    /* ---------------- INTERNAL EMAIL ---------------- */

    const internalSubject = `New Day One lead — ${leadEmail}`;
    const internalText = [
      "New lead request",
      "",
      `Email: ${leadEmail}`,
      "",
      "Brief:",
      brief,
      "",
      attachments.length
        ? `Reference image: attached (${attachments[0].filename})`
        : "Reference image: none",
    ].join("\n");

    const internalHtml = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;">
        <h2 style="margin:0 0 12px 0;">New “Visual idea” lead</h2>
        <p><strong>Email:</strong> ${escapeHtml(leadEmail)}</p>
        <p style="margin:16px 0 6px 0;"><strong>Brief:</strong></p>
        <div style="white-space:pre-wrap; padding:12px; border:1px solid #e5e7eb; border-radius:10px; background:#fafafa;">
          ${escapeHtml(brief)}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: LEADS_TO_EMAIL,
      replyTo: leadEmail,
      subject: internalSubject,
      text: internalText,
      html: internalHtml,
      attachments,
    });

    /* ---------------- AUTO-REPLY EMAIL ---------------- */

    const ackSubject = "Thanks — your Day One request is received";

    const ackText = [
      "Hi,",
      "",
      "Thanks for reaching out to Day One.",
      "We’ve received your request and we’re reviewing it now.",
      "",
      "We’ll be in touch shortly with a concept visual and next steps.",
      "",
      "— Day One",
    ].join("\n");

    const ackHtml = `
      <div style="
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
        background: #ffffff;
        color: #0f172a;
      ">
        <div style="max-width:560px;margin:0 auto;padding:24px;">
          
          <!-- Accent -->
          <div style="
            height:4px;
            width:48px;
            background:#7c3aed;
            border-radius:999px;
            margin-bottom:24px;
          "></div>

          <p style="margin:0 0 14px 0;">Hi,</p>

          <p style="margin:0 0 16px 0;">
            Thanks for reaching out to
            <strong style="color:#7c3aed;">Day One</strong>.
            We’ve received your request and we’re reviewing it now.
          </p>

          <p style="margin:0 0 20px 0;">
            We’ll be in touch shortly with a concept visual and next steps.
          </p>

          <div style="
            margin:24px 0;
            padding:16px;
            border-radius:14px;
            background:#f5f3ff;
            border:1px solid #ddd6fe;
          ">
            <p style="margin:0;font-size:14px;color:#4c1d95;">
              If you have additional references — brand colors, examples you like,
              or a link to your Instagram or website — feel free to reply to this email.
            </p>
          </div>

          <p style="margin:24px 0 0 0;">
            — <strong>Day One</strong>
          </p>

          <p style="margin:6px 0 0 0;font-size:12px;color:#6b7280;">
            Done-for-you visuals for local businesses
          </p>

        </div>
      </div>
    `;

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: leadEmail,
      replyTo: LEADS_TO_EMAIL,
      subject: ackSubject,
      text: ackText,
      html: ackHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead email flow FAILED:", err);
    return NextResponse.json({ ok: false, error: "Email failed to send." }, { status: 500 });
  }
}
