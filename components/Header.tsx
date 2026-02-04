import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { KiwiLogo } from "@/components/ui/KiwiLogo";
import { LocaleIcon } from "@/components/ui/LocaleIcon";
import { Stack } from "@/components/ui/Stack";
import { header } from "@/lib/ui-patterns";

export function Header() {
  return (
    <header className={header.root} role="banner" aria-label="사이트 헤더">
      <Stack direction="row" align="center" justify="between" className="w-full flex-1">
        <Link href="/" aria-label="키위 홈" className="flex items-center">
          <KiwiLogo width={80} height={24} />
        </Link>
        <Button
          variant="locale"
          size="locale"
          className="gap-2"
          aria-label="언어 선택: 한국어"
        >
          <LocaleIcon width={16} height={16} className="size-4" />
          <span>KO</span>
        </Button>
      </Stack>
    </header>
  );
}
