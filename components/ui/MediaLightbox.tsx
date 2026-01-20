// src/components/ui/MediaLightbox.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type LightboxMedia =
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "video";
      src: string;
      srcWebm?: string;
      poster?: string;
      title?: string;
    };

interface MediaLightboxProps {
  media: LightboxMedia | null;
  onClose: () => void;
}

export default function MediaLightbox({ media, onClose }: MediaLightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!media) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [media, onClose]);

  const node = useMemo(() => {
    if (!mounted || !media) return null;

    return createPortal(
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/85 p-4"
        onClick={onClose}
      >
        <div
          className="relative flex max-h-[92vh] w-full max-w-6xl items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-2 top-2 z-10 rounded-full bg-black/70 px-3 py-1.5 text-sm text-white hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            ✕
          </button>

          {media.type === "image" ? (
            <div className="relative h-[92vh] w-full">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="w-full">
              <div className="relative overflow-hidden rounded-xl bg-black">
                <video
                  className="h-auto max-h-[92vh] w-full"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={media.poster}
                >
                  {media.srcWebm ? <source src={media.srcWebm} type="video/webm" /> : null}
                  <source src={media.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {media.title ? (
                <p className="mt-3 text-center text-sm text-white/80">{media.title}</p>
              ) : null}
            </div>
          )}
        </div>
      </div>,
      document.body
    );
  }, [mounted, media, onClose]);

  return node;
}