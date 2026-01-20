// src/components/sections/SiteFooter.tsx
import type { NavItem } from "../../types/landig";
export default function SiteFooter({ nav }: { nav: NavItem[] }) {
  return (
    <footer className="border-t border-slate-100 py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-slate-900 text-white">
              <span aria-hidden className="text-sm font-semibold">
                V
              </span>
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">Visuals for Cyprus</p>
              <p className="text-sm text-slate-600">
                Done-for-you images & short videos for local businesses.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#request"
              className="font-medium text-slate-900 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4"
            >
              Request
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Visuals for Cyprus. All rights reserved.</p>
          <p className="text-slate-500">UI-only demo. Backend will be added later.</p>
        </div>
      </div>
    </footer>
  );
}
