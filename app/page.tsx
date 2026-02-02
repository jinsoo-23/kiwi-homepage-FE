import { Header } from "@/components/Header";
import {
  HeroSection,
  IntroSection,
  PartnersSection,
  SectionTitle,
  ServiceSection,
} from "@/components/sections";
import { Box } from "@/components/ui/Box";
import { Container } from "@/components/ui/Container";
import { Stack } from "@/components/ui/Stack";
import { header } from "@/lib/ui-patterns";

export default function Home() {
  return (
    <Box className="relative">
      <Box className={header.overlay}>
        <Header />
      </Box>
      <Box as="main" id="main-content" aria-label="본문">
        <HeroSection />
        <Container
          maxWidth="xl"
          className="py-[120px] flex flex-col gap-[200px]"
        >
          <IntroSection />
          <Stack gap={80} align="center" justify="center" className="[&>section]:w-full">
            <SectionTitle id="architecture-heading">의 아키텍처</SectionTitle>
            <ServiceSection aria-labelledby="architecture-heading" />
          </Stack>
          <PartnersSection />
        </Container>
      </Box>
    </Box>
  );
}
