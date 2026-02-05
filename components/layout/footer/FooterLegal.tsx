"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Stack } from "@/components/ui/Stack";

export function FooterLegal() {
  const t = useTranslations("footer");

  return (
    <Stack direction="column" gap={1} className="md:text-right">
      <Link href="/privacy" className="underline hover:opacity-90">
        {t("privacyPolicy")}
      </Link>
      <p className="whitespace-nowrap">{t("copyright")}</p>
    </Stack>
  );
}
