import { SectionTitle } from "@/components/sections/SectionTitle";
import { Box } from "@/components/ui/Box";
import { PartnersCarouselSection } from "./PartnersCarouselSection";

export function PartnersSection() {
  return (
    <Box
      as="section"
      aria-labelledby="partners-heading"
      className="flex flex-col gap-[80px] items-center justify-center overflow-hidden bg-[var(--surface-section-alt)] py-[60px] ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-[100vw] max-w-none"
    >
      <SectionTitle id="partners-heading">의 든든한 동료들</SectionTitle>
      <PartnersCarouselSection />
    </Box>
  );
}
