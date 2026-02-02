"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const PARTNER_ICON_MAP = {
  canvas: "canvas.svg",
  ignite_ai: "Ignite_ai.svg",
  panopto: "panopto.svg",
  zoom: "zoom.svg",
  slack: "slack.svg",
  notion: "notion.svg",
  genwave: "genwave.svg",
} as const;

export type PartnerIconVariant = keyof typeof PARTNER_ICON_MAP;

export const PARTNER_ICON_VARIANTS: PartnerIconVariant[] = [
  "canvas",
  "ignite_ai",
  "panopto",
  "zoom",
  "slack",
  "notion",
  "genwave",
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
  const src = `/partner/${encodeURIComponent(filename)}`;

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
