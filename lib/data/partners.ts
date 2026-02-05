import type { PartnerCard, PartnerIconVariant } from "@/lib/types";

export type { PartnerCard, PartnerIconVariant };

export const PARTNER_CARDS: PartnerCard[] = [
  {
    id: "canvas",
    logoSize: "large",
    learnMoreHref: "https://www.instructure.com/canvas",
    together: true,
  },
  {
    id: "igniteAi",
  },
  {
    id: "panopto",
    logoSize: "large",
    learnMoreHref: "https://www.instructure.com/canvas",
    together: true,
  },
  {
    id: "zoom",
    learnMoreHref: "https://www.zoom.com/?lang=ko-KO",
    together: true,
  },
  {
    id: "slack",
  },
  {
    id: "notion",
    learnMoreHref: "https://www.zoom.com/?lang=ko-KO",
    together: true,
  },
  {
    id: "genwave",
  },
  {
    id: "diquest",
  },
];

/** '와 함께' 섹션용 파트너 카드 (together: true인 항목) */
export const TOGETHER_PARTNER_CARDS: PartnerCard[] = PARTNER_CARDS.filter(
  (card) => card.together === true
);
