"use client";

import { useTranslations } from "next-intl";

export function IntroHeadline() {
  const t = useTranslations("intro");
  const headline = t("headline");
  const highlight = t("headlineHighlight");

  const parts = headline.split(highlight);

  return (
    <h2
      id="intro-heading"
      className="text-[40px] md:text-[64px] lg:text-[clamp(80px,8vw,112px)] font-extrabold leading-tight whitespace-pre-line"
    >
      {parts[0]}
      <span className="text-linus-service">{highlight}</span>
      {parts[1]}
    </h2>
  );
}
