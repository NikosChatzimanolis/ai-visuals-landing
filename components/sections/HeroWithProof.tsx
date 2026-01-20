// src/components/sections/HeroWithProof.tsx
import type { BeforeAfterPair } from "../../types/landig";
import BeforeAfterGallery from "../BeforeAfterGallery";

export default function HeroWithProof({ pairs }: { pairs: BeforeAfterPair[] }) {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 left-1/2 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-violet-100/70 blur-3xl" />
        <div className="absolute -bottom-48 left-1/3 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-fuchsia-100/40 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left copy */}
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
              <span className="inline-block size-1.5 rounded-full bg-violet-600" aria-hidden />
              Done-for-you visuals for Cyprus
            </p>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Professional product photos and short videos —{" "}
              <span className="text-slate-700">without a photoshoot</span>
            </h1>

            <p className="mt-5 text-pretty text-base text-slate-700 sm:text-lg">
              For restaurants, liquor stores, boutiques, and local businesses that need consistent,
              high-quality content for Instagram, Facebook, menus, websites, and listings. You brief
              us. We deliver ready-to-post visuals.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start">
              <a
                href="#request"
                className="inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 sm:w-auto"
              >
                Submit a request
              </a>
              <a
                href="#examples"
                className="inline-flex w-full items-center justify-center rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-sm hover:bg-violet-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 sm:w-auto"
              >
                See more examples
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <dt className="text-xs font-medium text-slate-600">Turnaround</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">24–72 hours</dd>
                <dd className="mt-1 text-sm text-slate-700">Depends on complexity and package.</dd>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <dt className="text-xs font-medium text-slate-600">Output</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">Ready to post</dd>
                <dd className="mt-1 text-sm text-slate-700">Correct sizes for social, web, listings.</dd>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <dt className="text-xs font-medium text-slate-600">Quality control</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">Human reviewed</dd>
                <dd className="mt-1 text-sm text-slate-700">Curated and refined before delivery.</dd>
              </div>
            </dl>
          </div>

          {/* Right: before/after */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-violet-100 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Before → After</p>
                  <p className="mt-1 text-sm text-slate-700">
                    What your audience sees when your visuals look premium.
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
                  Visible proof
                </span>
              </div>

              {/* NOTE: BeforeAfterGallery already includes its own spacing. */}
              <BeforeAfterGallery pairs={pairs} />

              <p className="mt-4 text-xs text-slate-600">
                Tip: we can deliver variations for different platforms (Post, Story, Reel cover, website banner).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
