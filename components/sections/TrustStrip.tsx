// src/components/sections/TrustStrip.tsx
import type { TrustItem } from "../../types/landig";

export default function TrustStrip({ items }: { items: TrustItem[] }) {
  return (
    <section className="py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-900">{it.title}</p>
              <p className="mt-1 text-sm text-slate-700">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
