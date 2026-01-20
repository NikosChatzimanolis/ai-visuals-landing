"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import MediaLightbox from "../ui/MediaLightbox";
import type { ExampleCard } from "../../types/landig";

type ActiveMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; title?: string }
  | null;

interface Props {
  cards: ExampleCard[];
}

export default function ExamplesSection({ cards }: Props) {
  const [active, setActive] = useState<ActiveMedia>(null);

  const open = useCallback((card: ExampleCard) => {
    if (card.type === "image") {
      setActive({ type: "image", src: card.src, alt: card.alt });
    } else {
      setActive({
        type: "video",
        src: card.src,
        poster: card.poster,
        title: card.title,
      });
    }
  }, []);

  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <section id="examples" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              More examples
            </h2>
            <p className="mt-4 text-pretty text-base text-slate-700 sm:text-lg">
              Click any example to view it fullscreen. Videos open with playback controls.
            </p>
          </div>

          <div className="mx-auto mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => open(ex)}
                className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-7 text-left shadow-sm transition hover:-translate-y-[2px] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
                aria-label={`Open ${ex.type}: ${ex.title}`}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-violet-700">{ex.tag}</p>
                  <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {ex.type === "video" ? "Video" : "Image"}
                  </span>
                </div>

                {/* Media */}
                <div className="relative mt-5 aspect-[3/3] w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  {ex.type === "image" ? (
                    <Image
                      src={ex.src}
                      alt={ex.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 460px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <>
                      <Image
                        src={ex.poster ?? "/images/examples/whisky.jpg"}
                        alt={ex.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 460px"
                        className="object-cover"
                        unoptimized
                      />
                      <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-3.5 py-1.5 text-xs font-semibold text-white">
                        <span aria-hidden className="text-base leading-none">▶</span>
                        Play
                      </span>
                    </>
                  )}
                </div>

                {/* Text */}
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {ex.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-700">
                    {ex.note}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <MediaLightbox media={active} onClose={close} />
    </>
  );
}
