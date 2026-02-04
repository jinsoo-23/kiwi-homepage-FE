"use client";

import { Button } from "@/components/ui/Button";
import { scrollToMainContainer } from "@/lib/scroll";
import { heroCta } from "@/lib/uiPatterns";

export function ScrollToMainButton() {
  return (
    <Button
      type="button"
      onClick={scrollToMainContainer}
      className={heroCta.learnMore}
    >
      더 알아보기
    </Button>
  );
}
