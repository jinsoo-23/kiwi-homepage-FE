"use client";

import { useTranslations } from "next-intl";

export function IntroCopy() {
  const t = useTranslations("intro");

  return (
    <p className="text-base md:text-xl lg:text-[28px] font-semibold text-label-neutral leading-relaxed whitespace-pre-line">
      {t("copy")}
    </p>
  );
}
