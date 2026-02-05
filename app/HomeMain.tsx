import { getTranslations } from "next-intl/server";
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

export async function HomeMain() {
  const tArch = await getTranslations("architecture");
  const tPartners = await getTranslations("partners");

  return (
    <>
      <HeroSection />
      <Container
        id="main-container"
        maxWidth="xl"
        className="flex flex-col"
      >
        <IntroScrollBlock />

        <SectionAlt aria-label={tArch("sectionLabel")}>
          <Container maxWidth="xl" className={sectionContent}>
            <SectionTitle
              id="architecture-heading"
              particle={tArch("particle")}
              title={tArch("sectionTitle")}
              mobileBreak
            />
            <ServiceSection aria-labelledby="architecture-heading" />
          </Container>
          <Container maxWidth="xl" className={sectionContent}>
            <SectionTitle
              id="partners-heading"
              particle={tPartners("particle")}
              title={tPartners("sectionTitle")}
              mdAlign="left"
            />
            <PartnersCarouselSection />
          </Container>
        </SectionAlt>
        <ContactSection />
      </Container>
    </>
  );
}
