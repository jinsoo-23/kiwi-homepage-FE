"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { scrollToMainContainer } from "@/lib/scroll";
import { heroCta } from "@/lib/uiPatterns";

export function ScrollToMainButton() {
  const t = useTranslations("common");

  return (
    <Button
      type="button"
      onClick={scrollToMainContainer}
      className={heroCta.learnMore}
    >
      {t("learnMore")}
    </Button>
  );
}
