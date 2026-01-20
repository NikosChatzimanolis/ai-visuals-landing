// src/components/sections/ExamplesSection.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import type { ExampleCard } from "../../types/landig";
import MediaLightbox from "../ui/MediaLightbox";


type ActiveMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; srcWebm?: string; poster?: string; title?: string }
  | null;

export default function ExamplesSection({ cards = [] }: { cards?: ExampleCard[] }) {
  const [active, setActive] = useState<ActiveMedia>(null);

  const close = useCallback(() => setActive(null), []);

  const open = useCallback((card: ExampleCard) => {
    if (card.type === "image") {
      setActive({ type: "image", src: card.src, alt: card.alt });
      return;
    }

    // video
    setActive({
      type: "video",
      src: card.src,
      srcWebm: card.srcWebm,
      poster: card.poster,
      title: card.title,
    });
  }, []);

  const playBadge = useMemo(
    () => (
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white">
        <span aria-hidden className="text-base leading-none">
          ▶
        </span>
        Play
      </span>
    ),
    []
  );

  return (
    <>
      <section id="examples" className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              More examples
            </h2>
            <p className="mt-3 text-pretty text-base text-slate-700 sm:text-lg">
              Click any example to view fullscreen. Videos open with playback controls.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => open(ex)}
                className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-[1px] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
                aria-label={`Open ${ex.type === "video" ? "video" : "image"}: ${ex.title}`}
              >
                {/* header */}
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold text-violet-700">{ex.tag}</p>
                  <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-2 py-1 text-[11px] font-medium text-slate-700">
                    {ex.type === "video" ? "Video" : "Image"}
                  </span>
                </div>

                {/* MEDIA FRAME — consistent size across all cards */}
                <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                  {ex.type === "image" ? (
                    <Image
                      src={ex.src}
                      alt={ex.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <>
                      <Image
                        src={ex.poster ?? "/images/examples/whisky.jpg"}
                        alt={ex.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover"
                        unoptimized
                      />
                      {playBadge}
                    </>
                  )}
                </div>

                {/* text */}
                <div className="mt-4">
                  <h3 className="text-base font-semibold text-slate-900">{ex.title}</h3>
                  <p className="mt-1 text-sm text-slate-700">{ex.note}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen portal lightbox */}
      <MediaLightbox media={active} onClose={close} />
    </>
  );
}
