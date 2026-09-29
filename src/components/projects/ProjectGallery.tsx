"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImageAsset } from "@/types/content";

/**
 * Project photo grid with an accessible lightbox built on the native modal
 * <dialog> (focus containment, Escape to close). Arrow keys page through
 * images.
 */
export function ProjectGallery({ images, title }: { images: ImageAsset[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);
  const current = images[index];

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden bg-concrete-200"
              aria-label={`View larger: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title} — photo ${index + 1} of ${images.length}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="surface-dark m-auto h-dvh max-h-none w-full max-w-none bg-ink/95 p-0 text-white backdrop:bg-ink/80 open:flex open:flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <p className="eyebrow text-concrete-300">
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex min-h-11 items-center gap-2 border border-white/30 px-3 text-sm font-semibold hover:border-white"
          >
            <X aria-hidden="true" className="size-5" /> Close
          </button>
        </div>
        {current && (
          <figure className="relative flex-1">
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
          </figure>
        )}
        {images.length > 1 && (
          <div className="flex justify-center gap-3 p-4">
            <button type="button" onClick={() => step(-1)} className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/30 hover:border-white" aria-label="Previous photo">
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button type="button" onClick={() => step(1)} className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/30 hover:border-white" aria-label="Next photo">
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
