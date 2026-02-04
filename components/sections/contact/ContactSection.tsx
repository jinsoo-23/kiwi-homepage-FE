"use client";

import { SectionTitle } from "@/components/sections/SectionTitle";
import { PartnerCard } from "@/components/sections/partners/PartnerCard";
import { Container } from "@/components/ui/Container";
import { TOGETHER_PARTNER_CARDS } from "@/lib/data/partners";
import { sectionContent } from "@/lib/uiPatterns";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <Container maxWidth="xl" className={sectionContent}>
      <div className="flex flex-col gap-10 w-full py-10 md:py-20 lg:flex-row lg:gap-[10%] lg:justify-between">
        <div className="flex flex-col gap-8 w-full lg:w-1/2 lg:gap-15">
          <div className="flex flex-col gap-4 md:gap-6">
            <SectionTitle id="together-heading" title="와 함께" justify="start" />
            <div className="text-base md:text-[18px] font-semibold text-label-alternative">
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
                logoCardClassName="bg-secondary py-4 px-6 md:py-5 md:px-10"
                contentJustify="start"
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
