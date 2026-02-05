import { Link } from "@/i18n/navigation";
import { KiwiLogo } from "@/components/ui/KiwiLogo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Stack } from "@/components/ui/Stack";
import { header } from "@/lib/uiPatterns";

export function Header() {
  return (
    <header className={header.root} role="banner" aria-label="사이트 헤더">
      <Stack direction="row" align="center" justify="between" className="w-full flex-1">
        <Link href="/" aria-label="키위 홈" className="flex items-center">
          <KiwiLogo width={80} height={24} />
        </Link>
        <LanguageSwitcher />
      </Stack>
    </header>
  );
}
