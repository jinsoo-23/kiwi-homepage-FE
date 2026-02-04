import { cn } from "@/lib/utils";

const glassPill = cn(
  "rounded-[100px] border border-white/20 bg-white/10",
  "shadow-glass backdrop-blur-md"
);

export const pillButton = {
  locale: cn(
    "rounded-[100px] border border-line-non-opaque-primary bg-fill-normal",
    "text-label-regular text-xs font-bold hover:bg-fill-normal/80"
  ),
  localeSize: "py-[6px] px-3 rounded-[100px]",
} as const;

export const header = {
  root: cn(
    "flex justify-between items-center w-full my-5 mx-auto px-5 py-3",
    "max-w-full md:max-w-[768px] md:px-6 lg:max-w-[1440px] lg:px-8",
    glassPill
  ),
  overlay: "sticky top-5 left-0 right-0 z-50 w-full px-7 md:px-6 lg:px-8",
} as const;

/** 풀 너비 회색 섹션 (아키텍처·든든한 동료들 등) */
export const sectionAlt = cn(
  "flex flex-col gap-[80px] items-center justify-center overflow-hidden",
  "bg-surface-section-alt py-[60px]",
  "ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-[100vw] max-w-none"
);

/** 섹션 내부 콘텐츠 컨테이너 (max-w + 패딩) */
export const sectionContent = cn(
  "flex flex-col gap-[48px] md:gap-[80px] items-center w-full",
  "px-7 sm:px-6 lg:px-8"
);

/** 히어로 CTA: 더 알아보기 버튼 (초록) */
export const heroCta = {
  learnMore:
    "w-[108px] px-4 py-2 rounded-[100px] bg-linus-primary text-linus-white hover:bg-linus-primary-dark",
  brochure: cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[100px] w-[108px] px-4 py-2 text-sm font-medium transition-colors",
    "bg-white text-linus-primary border border-linus-primary",
    "hover:bg-linus-primary-light hover:text-linus-primary-dark hover:border-linus-primary-dark",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  ),
} as const;
