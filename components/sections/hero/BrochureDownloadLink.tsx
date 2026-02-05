"use client";

import { useTranslations } from "next-intl";
import { paths } from "@/lib/paths";
import { heroCta } from "@/lib/uiPatterns";

export function BrochureDownloadLink() {
  const t = useTranslations("common");

  return (
    <a
      href={paths.brochure.href}
      download={paths.brochure.download}
      className={heroCta.brochure}
    >
      {t("downloadBrochure")}
    </a>
  );
}
