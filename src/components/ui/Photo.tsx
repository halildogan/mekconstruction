import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";

interface PhotoProps {
  image: ImageAsset;
  /** Responsive sizes hint — always provide a realistic value. */
  sizes: string;
  /** Aspect-ratio class for the frame, e.g. "aspect-[4/3]". Omit when the parent sizes the frame. */
  ratio?: string;
  className?: string;
  imageClassName?: string;
  /** Mark as the LCP image (hero). */
  preload?: boolean;
  /** Decorative duplicates set alt to empty. */
  decorative?: boolean;
  /** Absolutely fill the nearest positioned ancestor (background imagery). */
  cover?: boolean;
}

/**
 * Framed, cropped image that fills its container without layout shift.
 * Works with statically imported images (blur placeholder included) and with
 * CMS/remote images that carry explicit dimensions.
 */
export function Photo({ image, sizes, ratio, className, imageClassName, preload, decorative, cover }: PhotoProps) {
  const isStatic = typeof image.src !== "string";
  return (
    <div
      className={cn(
        cover ? "absolute inset-0" : "relative",
        "overflow-hidden",
        !className?.includes("bg-") && "bg-concrete-200",
        ratio,
        className,
      )}
    >
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        fill
        sizes={sizes}
        preload={preload}
        placeholder={isStatic ? "blur" : "empty"}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
