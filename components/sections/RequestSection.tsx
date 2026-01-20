// src/components/sections/RequestSection.tsx
"use client";

import { useMemo, useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function RequestSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");
  const [fileName, setFileName] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const canSubmit = useMemo(() => {
    const e = email.trim();
    const b = brief.trim();
    return e.length > 0 && b.length >= 5 && status !== "submitting";
  }, [email, brief, status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("submitting");

    const fd = new FormData();
    fd.set("email", email.trim());
    fd.set("brief", brief.trim());

    const file = fileRef.current?.files?.[0];
    if (file) fd.set("image", file);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        body: fd,
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setEmail("");
      setBrief("");
      setFileName("");
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <section id="request" className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Get a visual idea
          </h2>
          <p className="mt-3 text-pretty text-base text-slate-700 sm:text-lg">
            Send a quick brief and (optionally) a reference image. We’ll reply with one concept visual
            to show the direction.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Concept preview only. Final assets, revisions, and videos are included in monthly packages.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {status === "success" ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
              <p className="text-sm font-semibold text-emerald-900">Received ✅</p>
              <p className="mt-2 text-sm text-emerald-900/80">
                We’ll email you a concept visual soon. If you included a reference image, we’ll use it as direction.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  placeholder="you@business.com"
                />
              </div>

              <div>
                <label htmlFor="brief" className="block text-sm font-semibold text-slate-900">
                  Brief
                </label>
                <textarea
                  id="brief"
                  name="brief"
                  required
                  value={brief}
                  onChange={(ev) => setBrief(ev.target.value)}
                  className="mt-2 min-h-[120px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  placeholder="What are you promoting? (product/service, offer, vibe, where you’ll use it — Instagram post, story, menu, website, etc.)"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Tip: include a brand vibe (premium / playful / minimal), and the main CTA (e.g. “Weekend offer”).
                </p>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-semibold text-slate-900">
                  Reference image (optional)
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    ref={fileRef}
                    id="image"
                    name="image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(ev) => setFileName(ev.target.files?.[0]?.name ?? "")}
                    className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-violet-600 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-violet-700"
                  />
                  {fileName ? (
                    <span className="text-xs text-slate-600">Selected: {fileName}</span>
                  ) : (
                    <span className="text-xs text-slate-500">JPG/PNG/WebP, max 3MB</span>
                  )}
                </div>
              </div>

              {status === "error" ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-sm font-semibold text-rose-900">Couldn’t send</p>
                  <p className="mt-1 text-sm text-rose-900/80">{error}</p>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  "inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2",
                  canSubmit
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "cursor-not-allowed bg-slate-200 text-slate-500",
                ].join(" ")}
              >
                {status === "submitting" ? "Sending..." : "Get a visual idea"}
              </button>

              <p className="text-center text-xs text-slate-500">
                By submitting, you agree we can email you about your request. No spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
