import { setRequestLocale, getTranslations } from "next-intl/server";
import { Footer, Header } from "@/components/layout";
import { HomeMain } from "@/app/HomeMain";
import { Box } from "@/components/ui/Box";
import { header } from "@/lib/uiPatterns";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("common");

  return (
    <Box className="relative">
      <Box className={header.overlay}>
        <Header />
      </Box>
      <Box as="main" id="main-content" aria-label={t("mainContent")}>
        <HomeMain />
      </Box>
      <Footer />
    </Box>
  );
}
