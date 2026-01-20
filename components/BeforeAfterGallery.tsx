// src/components/BeforeAfterGallery.tsx
"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import type { BeforeAfterPair } from "../types/landig";
import MediaLightbox from "../components/ui/MediaLightbox";

interface Props {
  pairs: BeforeAfterPair[];
}

export default function BeforeAfterGallery({ pairs }: Props) {
  const [active, setActive] = useState<{ type: "image"; src: string; alt: string } | null>(null);

  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <div className="mt-5 space-y-4">
        {pairs.map((pair) => (
          <div key={pair.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{pair.title}</p>
                <p className="text-xs text-slate-600">{pair.subtitle}</p>
              </div>
              <span className="mt-2 inline-flex w-fit items-center rounded-full border border-violet-200 bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-700 sm:mt-0">
                Transformation
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setActive({ type: "image", src: pair.beforeSrc, alt: pair.beforeAlt })}
                className="text-left"
                aria-label={`Open before image: ${pair.title}`}
              >
                <figure className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
                    <span className="text-[11px] font-semibold text-slate-700">Before</span>
                    <span className="text-[11px] text-slate-500">Original</span>
                  </div>
                  <div className="relative aspect-[3/3]">
                    <Image
                      src={pair.beforeSrc}
                      alt={pair.beforeAlt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 340px"
                      className="object-cover"
                      priority={pair.id === "whisky"}
                    />
                  </div>
                </figure>
              </button>

              <button
                type="button"
                onClick={() => setActive({ type: "image", src: pair.afterSrc, alt: pair.afterAlt })}
                className="text-left"
                aria-label={`Open after image: ${pair.title}`}
              >
                <figure className="overflow-hidden rounded-xl border border-violet-200 bg-violet-50">
                  <div className="flex items-center justify-between border-b border-violet-200 bg-white px-3 py-2">
                    <span className="text-[11px] font-semibold text-slate-700">After</span>
                    <span className="text-[11px] text-violet-700">Marketing-ready</span>
                  </div>
                  <div className="relative aspect-[3/3]">
                    <Image
                      src={pair.afterSrc}
                      alt={pair.afterAlt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 340px"
                      className="object-cover"
                      priority={pair.id === "whisky"}
                    />
                  </div>
                </figure>
              </button>
            </div>
          </div>
        ))}
      </div>

      <MediaLightbox media={active} onClose={close} />
    </>
  );
}
