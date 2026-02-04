import {
  HeroSection,
  IntroScrollBlock,
  PartnersCarouselSection,
  SectionTitle,
  ServiceSection,
  ContactSection,
} from "@/components/sections";
import { Container, SectionAlt } from "@/components/ui";
import { sectionContent } from "@/lib/uiPatterns";
export function HomeMain() {
  return (
    <>
      <HeroSection />
      <Container
        id="main-container"
        maxWidth="xl"
        className="flex flex-col"
      >
        <IntroScrollBlock />

        <SectionAlt aria-label="아키텍처 및 파트너">
          <Container maxWidth="xl" className={sectionContent}>
            <SectionTitle id="architecture-heading" title="의 견고한 아키텍처" />
            <ServiceSection aria-labelledby="architecture-heading" />
          </Container>
          <Container maxWidth="xl" className={sectionContent}>
            <SectionTitle id="partners-heading" title="의 든든한 동료들" />
            <PartnersCarouselSection />
          </Container>
        </SectionAlt>
        <ContactSection />
      </Container>
    </>
  );
}
