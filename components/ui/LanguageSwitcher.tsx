"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LocaleIcon } from "@/components/ui/LocaleIcon";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale: Locale = locale === "ko" ? "en" : "ko";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Button
      variant="locale"
      size="locale"
      className="gap-2"
      onClick={toggleLocale}
      disabled={isPending}
      aria-label={locale === "ko" ? "Switch to English" : "한국어로 변경"}
    >
      {isPending ? (
        <LoadingSpinner className="size-4" />
      ) : (
        <LocaleIcon width={16} height={16} className="size-4" />
      )}
      <span>{locale.toUpperCase()}</span>
    </Button>
  );
}
