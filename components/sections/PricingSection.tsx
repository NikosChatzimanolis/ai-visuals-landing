// src/components/sections/PricingSection.tsx
import type { PricingPlan } from "@/types/landig";

export default function PricingSection({ plans }: { plans: PricingPlan[] }) {
  return (
    <section id="pricing" className="bg-violet-50/40 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple monthly packages
          </h2>
          <p className="mt-3 text-pretty text-base text-slate-700 sm:text-lg">
            No credits. Clear deliverables per month.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={[
                "rounded-2xl border bg-white p-6 shadow-sm",
                p.highlight ? "border-violet-600 ring-1 ring-violet-600" : "border-violet-100",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{p.name}</h3>
                  <p className="mt-2 text-sm text-slate-700">{p.desc}</p>
                </div>
                {p.highlight ? (
                  <span className="inline-flex items-center rounded-full bg-violet-600 px-2.5 py-1 text-[11px] font-semibold text-white">
                    Most popular
                  </span>
                ) : null}
              </div>

              <p className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">{p.price}</p>

              <ul className="mt-6 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                    <span aria-hidden className="mt-1 inline-block size-1.5 rounded-full bg-violet-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#request"
                className={[
                  "mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2",
                  p.highlight
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "border border-violet-200 bg-white text-slate-900 hover:bg-violet-50",
                ].join(" ")}
              >
                Request this package
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}