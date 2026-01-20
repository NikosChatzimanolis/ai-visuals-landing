// src/app/request-form-client.tsx
"use client";

import { useCallback } from "react";

export default function RequestFormClient() {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.alert("UI-only demo: backend not connected yet.");
  }, []);

  return (
    <form onSubmit={handleSubmit} aria-label="Request visuals form (UI only)">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-900">Business name</span>
          <input
            type="text"
            name="businessName"
            autoComplete="organization"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
            placeholder="e.g., Limassol Spirits / City Boutique"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-900">Contact email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
            placeholder="you@business.com"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-900">Phone / WhatsApp</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
            placeholder="+357 ..."
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-900">Business type</span>
          <select
            name="businessType"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
            defaultValue="Liquor store"
          >
            <option>Restaurant / café</option>
            <option>Liquor store</option>
            <option>Clothing / boutique</option>
            <option>Beauty / salon</option>
            <option>Other small business</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-900">What do you need?</span>
          <textarea
            name="brief"
            rows={6}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
            placeholder="Example: 8 product images for our new arrivals + 2 short videos for IG Reels. Style: premium, warm, clean. Include price overlays for promos."
            required
          />
          <p className="mt-2 text-xs text-slate-600">
            Tip: mention where you’ll use it (IG/FB/menu/website/delivery) and share any style references.
          </p>
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 size-4 rounded border-slate-300 text-violet-700 focus:ring-violet-600"
            required
          />
          <span>I understand this is a UI demo and submission is not connected yet.</span>
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
        >
          Send request
        </button>
      </div>
    </form>
  );
}
