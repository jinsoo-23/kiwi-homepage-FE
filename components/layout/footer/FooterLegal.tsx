"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Stack } from "@/components/ui/Stack";
import { MarketingConsentModal } from "@/components/sections/marketing-consent";

export function FooterLegal() {
  const t = useTranslations("footer");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Stack direction="column" gap={1} className="md:text-right">
        <div className="flex flex-col gap-1 md:flex-row md:gap-4">
          <Link href="/privacy-policy" className="underline hover:opacity-90">
            {t("privacyPolicy")}
          </Link>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer text-left underline hover:opacity-90 md:text-right"
          >
            {t("marketingConsentWithdraw")}
          </button>
        </div>
        <p className="whitespace-nowrap">{t("copyright")}</p>
      </Stack>
      <MarketingConsentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
