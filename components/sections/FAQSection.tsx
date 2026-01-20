// src/components/sections/FAQSection.tsx
import type { FAQItem } from "../../types/landig";

export default function FAQSection({ items }: { items: FAQItem[] }) {
  return (
    <section id="faq" className="py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">FAQ</h2>
          <p className="mt-3 text-pretty text-base text-slate-700 sm:text-lg">
            Clear answers for busy owners.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
          {items.map((item) => (
            <details key={item.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 focus:outline-none">
                <span className="text-sm font-semibold text-slate-900">{item.q}</span>
                <span
                  aria-hidden
                  className="inline-flex size-8 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-violet-700 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
