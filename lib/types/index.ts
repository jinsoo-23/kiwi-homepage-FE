// Architecture types
export type TabValue = "service" | "platform" | "foundation";

export type ArchitectureCard = {
  title: string;
  description: string;
};

// Partner types
export type PartnerIconVariant =
  | "canvas"
  | "igniteAi"
  | "panopto"
  | "zoom"
  | "slack"
  | "notion"
  | "genwave"
  | "diquest";

export type PartnerCard = {
  title: string;
  icon: PartnerIconVariant;
  description: string;
  /** 로고/아이콘 크기 (와 함께 섹션 등에서 큰 로고 노출 시 'large') */
  logoSize?: "default" | "large";
  /** 설명 내 강조할 문구 (해당 부분만 linus-service 색상 적용) */
  descriptionHighlight?: string;
  /** '더 알아보기' 링크 (와 함께 섹션 등) */
  learnMoreHref?: string;
  /** true면 '와 함께' 섹션에 노출 */
  together?: boolean;
};

// UI types
export type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
