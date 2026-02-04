import { Header } from "@/components/Header";
import { HomeMain } from "@/app/HomeMain";
import { Box } from "@/components/ui/Box";
import { header } from "@/lib/uiPatterns";

export default function Home() {
  return (
    <Box className="relative">
      <Box className={header.overlay}>
        <Header />
      </Box>
      <Box as="main" id="main-content" aria-label="본문">
        <HomeMain />
      </Box>
    </Box>
  );
}
