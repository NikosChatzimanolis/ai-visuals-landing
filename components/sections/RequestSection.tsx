// src/components/sections/RequestSection.tsx
import RequestFormClient from "../../app/request-form-client";

export default function RequestSection() {
  return (
    <section id="request" className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Request visuals
          </h2>
          <p className="mt-3 text-pretty text-base text-slate-700 sm:text-lg">
            UI-only form. You’ll connect it to your backend later (email/CRM/dashboard).
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <RequestFormClient />
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Future upgrade (when backend exists)</p>
            <p className="mt-1 text-sm text-slate-700">
              Add reference uploads (menu PDF, photos), delivery destination (Drive/dashboard), and request tracking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
