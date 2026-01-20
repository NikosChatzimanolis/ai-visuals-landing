// src/components/sections/IndustriesSection.tsx
import type { IndustryItem } from "../../types/landig";

export default function IndustriesSection({ items }: { items: IndustryItem[] }) {
  return (
    <section id="industries" className="bg-violet-50/40 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for local businesses
          </h2>
          <p className="mt-3 text-pretty text-base text-slate-700 sm:text-lg">
            The most common ways clients use visuals to sell more.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
