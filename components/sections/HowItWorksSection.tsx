// src/components/sections/HowItWorksSection.tsx
export default function HowItWorksSection() {
  return (
    <section id="how" className="py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-pretty text-base text-slate-700 sm:text-lg">
            Simple process. No apps, no prompting. Just results.
          </p>
        </div>

        <ol className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          <li className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold text-slate-600">Step 01</p>
            <h3 className="mt-2 text-base font-semibold text-slate-900">Send a brief</h3>
            <p className="mt-2 text-sm text-slate-700">
              Tell us what you’re promoting, where it will be used, and your preferred style. Add references if you have them.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold text-slate-600">Step 02</p>
            <h3 className="mt-2 text-base font-semibold text-slate-900">We generate & refine</h3>
            <p className="mt-2 text-sm text-slate-700">
              We create drafts, curate the best outputs, and refine for clarity, appetite appeal (if food), and brand consistency.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold text-slate-600">Step 03</p>
            <h3 className="mt-2 text-base font-semibold text-slate-900">You receive deliverables</h3>
            <p className="mt-2 text-sm text-slate-700">
              Final visuals in the right sizes for posts, stories, menus, websites, and listings—ready to publish.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
