// src/components/sections/SiteHeader.tsx
import type { NavItem } from "../../types/landig";

export default function SiteHeader({ nav }: { nav: NavItem[] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/65">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-4"
        >
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-slate-900 text-white">
            <span aria-hidden className="text-sm font-semibold">
              V
            </span>
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-base">
            Day One
          </span>
        </a>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary navigation">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-4"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#request"
          className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
        >
          Request visuals
        </a>
      </div>
    </header>
  );
}
