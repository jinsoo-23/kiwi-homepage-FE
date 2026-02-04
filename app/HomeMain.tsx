import {
  HeroSection,
  IntroScrollBlock,
  PartnersCarouselSection,
  SectionTitle,
  ServiceSection,
} from "@/components/sections";
import { ContactForm } from "@/components/sections/contact";
import { PartnerCard } from "@/components/sections/partners/PartnerCard";
import { Container } from "@/components/ui/Container";
import { SectionAlt } from "@/components/ui/SectionAlt";
import { TOGETHER_PARTNER_CARDS } from "@/lib/data/partners";
import { sectionContent } from "@/lib/ui-patterns";
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
        <Container maxWidth="xl" className={sectionContent}>
          <div className="flex gap-[160px] w-full py-20">
            <div className="flex flex-col gap-15 w-1/2">
              <div className="flex flex-col gap-6">
                <SectionTitle id="together-heading" title="와 함께" justify="start" />
                <div className="text-[18px] font-semibold text-label-alternative">
                  <p>궁금한 내용을 편하게 알려주세요.</p>
                  <p>담당자가 빠르게 연락드릴게요.</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {TOGETHER_PARTNER_CARDS.map((card) => (
                  <PartnerCard
                    key={card.title}
                    card={card}
                    showLearnMoreButton
                    learnMoreHref={card.learnMoreHref}
                    logoCardClassName="bg-secondary py-5 px-10"
                    contentJustify="start"
                  />
                ))}
              </div>
            </div>
            <div className="w-1/2">
              <ContactForm />
            </div>
          </div>


        </Container>
      </Container>
    </>
  );
}
