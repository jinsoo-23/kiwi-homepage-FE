"use client";

import { useLocale, useTranslations } from "next-intl";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { PartnerCard } from "@/components/sections/partners/PartnerCard";
import { Container } from "@/components/ui/Container";
import { TOGETHER_PARTNER_CARDS } from "@/lib/data/partners";
import { sectionContent } from "@/lib/uiPatterns";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  const locale = useLocale();
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const tPartners = useTranslations("partners");

  return (
    <Container maxWidth="xl" className={sectionContent}>
      <div className="grid grid-cols-1 gap-8 w-full py-10 md:py-20 lg:grid-cols-2 lg:gap-x-[10%] lg:gap-y-8">
        {/* 타이틀 + 설명: 모바일 1번째, 데스크탑 왼쪽 상단 */}
        <div className="flex flex-col gap-4 md:gap-6 order-1 lg:order-none lg:col-start-1 lg:row-start-1">
          <SectionTitle id="together-heading" particle={t("particle")} title={t("sectionTitle")} align="left" titleFirst={locale === "en"} />
          <p className="text-base md:text-[18px] font-semibold text-label-alternative whitespace-pre-line">
            {t("description")}
          </p>
        </div>
        {/* 폼: 모바일 2번째, 데스크탑 오른쪽 (2행 차지) */}
        <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <ContactForm />
        </div>
        {/* 파트너 카드: 모바일 3번째, 데스크탑 왼쪽 하단 */}
        <div className="flex flex-col gap-4 order-3 lg:order-none lg:col-start-1 lg:row-start-2">
          {TOGETHER_PARTNER_CARDS.map((card) => (
            <PartnerCard
              key={card.id}
              card={card}
              title={tPartners(`${card.id}.title`)}
              description={tPartners(`${card.id}.description`)}
              descriptionHighlight={tPartners.has(`${card.id}.descriptionHighlight`) ? tPartners(`${card.id}.descriptionHighlight`) : undefined}
              showLearnMoreButton
              learnMoreHref={card.learnMoreHref}
              learnMoreLabel={tCommon("learnMore")}
              logoCardClassName="bg-secondary py-4 px-6 md:py-5 md:px-10"
              contentJustify="start"
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
