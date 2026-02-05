import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PartnerIconVariant } from "@/lib/types";

const PARTNER_ICON_MAP: Record<PartnerIconVariant, string> = {
  canvas: "canvas.svg",
  igniteAi: "ignite-ai.svg",
  panopto: "panopto.svg",
  zoom: "zoom.svg",
  slack: "slack.svg",
  notion: "notion.svg",
  genwave: "genwave.svg",
  diquest: "diquest.svg",
};

export type { PartnerIconVariant };

export const PARTNER_ICON_VARIANTS: PartnerIconVariant[] = [
  "canvas",
  "igniteAi",
  "panopto",
  "zoom",
  "slack",
  "notion",
  "genwave",
  "diquest",
];

type PartnerIconProps = {
  icon: PartnerIconVariant;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};

function PartnerIcon({
  icon,
  alt = "",
  className,
  width = 120,
  height = 40,
}: PartnerIconProps) {
  const filename = PARTNER_ICON_MAP[icon];
  const src = `/logos/${encodeURIComponent(filename)}`;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-contain object-center w-full h-full", className)}
      unoptimized
    />
  );
}

export { PartnerIcon };
