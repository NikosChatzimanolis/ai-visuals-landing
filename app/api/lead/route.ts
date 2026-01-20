// src/app/api/lead/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs"; // required for email providers
export const dynamic = "force-dynamic";

const resendApiKey = process.env.RESEND_API_KEY;
const leadsToEmail = process.env.LEADS_TO_EMAIL;
const fromEmail = process.env.FROM_EMAIL;

if (!resendApiKey) {
  // eslint-disable-next-line no-console
  console.warn("Missing RESEND_API_KEY");
}
if (!leadsToEmail) {
  // eslint-disable-next-line no-console
  console.warn("Missing LEADS_TO_EMAIL");
}
if (!fromEmail) {
  // eslint-disable-next-line no-console
  console.warn("Missing FROM_EMAIL");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Basic in-memory rate limit (good enough for early stage; replace later with Upstash/Redis)
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 10;
const rateStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  const realIp = req.headers.get("x-real-ip");
  return realIp || "unknown";
}

function rateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const entry = rateStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= RATE_MAX) {
    const retryAfterSec = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return { ok: false, retryAfterSec };
  }

  entry.count += 1;
  rateStore.set(ip, entry);
  return { ok: true };
}

// Very small sanitization to reduce header/content injection risk in emails
function safeText(input: string): string {
  return input
    .replace(/\u0000/g, "")
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

const schema = z.object({
  email: z.string().email().max(254),
  brief: z.string().min(5).max(1200),
  // optional: file handled separately
});

const MAX_FILE_BYTES = 3 * 1024 * 1024; // 3MB
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec ?? 60) } }
    );
  }

  if (!resend || !leadsToEmail || !fromEmail) {
    return NextResponse.json(
      { ok: false, error: "Email service not configured." },
      { status: 500 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data." }, { status: 400 });
  }

  const emailRaw = String(form.get("email") ?? "");
  const briefRaw = String(form.get("brief") ?? "");

  const parsed = schema.safeParse({ email: emailRaw, brief: briefRaw });
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email and a short brief." },
      { status: 400 }
    );
  }

  const email = safeText(parsed.data.email);
  const brief = parsed.data.brief.trim();

  const file = form.get("image");
  let attachment:
    | { filename: string; content: Buffer; contentType: string }
    | undefined;

  if (file instanceof File) {
    if (file.size > 0) {
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

      const arrayBuffer = await file.arrayBuffer();
      attachment = {
        filename: safeText(file.name || "reference"),
        content: Buffer.from(arrayBuffer),
        contentType: file.type,
      };
    }
  }

  const subject = `New "Visual idea" lead — ${email}`;
  const text = [
    `New lead request`,
    ``,
    `Email: ${email}`,
    `IP: ${ip}`,
    ``,
    `Brief:`,
    brief,
    ``,
    attachment ? `Reference image: attached (${attachment.filename}, ${attachment.contentType})` : `Reference image: none`,
  ].join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;">
      <h2 style="margin:0 0 12px 0;">New “Visual idea” lead</h2>
      <p style="margin:0 0 8px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 8px 0;"><strong>IP:</strong> ${escapeHtml(ip)}</p>
      <p style="margin:16px 0 6px 0;"><strong>Brief:</strong></p>
      <div style="white-space:pre-wrap; padding:12px; border:1px solid #e5e7eb; border-radius:10px; background:#fafafa;">
        ${escapeHtml(brief)}
      </div>
      <p style="margin:16px 0 0 0; color:#6b7280;">
        ${attachment ? `Reference image attached: ${escapeHtml(attachment.filename)}` : `No reference image uploaded.`}
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: fromEmail,
      to: leadsToEmail,
      replyTo: email,
      subject,
      text,
      html,
      attachments: attachment
        ? [
            {
              filename: attachment.filename,
              content: attachment.content.toString("base64"),
              contentType: attachment.contentType,
            },
          ]
        : [],
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Resend send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send. Please try again." },
      { status: 500 }
    );
  }

  // Optional: you can add an auto-reply later (recommended AFTER you stabilize deliverables)
  return NextResponse.json({ ok: true });
}

function escapeHtml(str: string): string {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
