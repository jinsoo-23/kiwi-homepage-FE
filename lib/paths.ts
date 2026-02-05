/**
 * 정적 파일·다운로드 링크 경로
 * public/ 기준 URL 경로만 지정 (예: /documents/linus-brochure.pdf)
 */
export const paths = {
  /** 소개서 PDF (public 폴더 내 상대 경로) */
  brochure: {
    href: "/documents/linus-brochure.pdf",
    download: "라이너스_솔루션_소개서.pdf",
  },
} as const;
