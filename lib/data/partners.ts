import type { PartnerCard } from "@/lib/types";

export type { PartnerCard };

export const PARTNER_CARDS: PartnerCard[] = [
  {
    title: "Canvas By Instructure",
    icon: "canvas",
    description:
      "전 세계 수천 개의 대학교와 교육기관이 사용하는 글로벌 대표 LMS로, 국내 유일 라이선스 버전 공식 파트너를 통해 안정적인 운영 환경과 전문 기술 지원을 함께 제공합니다.",
    descriptionHighlight: "국내 유일 라이선스 버전 공식 파트너",
    logoSize: "large",
    learnMoreHref: "https://www.instructure.com/canvas",
    together: true,
  },
  {
    title: "Canvas IgniteAI",
    icon: "ignite_ai",
    description:
      "Instructure사가 OpenAI 기술을 기반으로 공동 설계한 교육 특화 AI로, 과제 · 퀴즈 · 루브릭 생성부터 토론 요약까지 학습 운영 전반을 지능적으로 지원합니다.",
  },
  {
    title: "Panopto CMS",
    icon: "panopto",
    description:
      "글로벌 대학교와 기업에서 사용하는 학습영상 관리 플랫폼으로, 강의 자동 녹화와 검색 기능을 통해 지식 자산을 효율적으로 저장 · 활용합니다.",
    logoSize: "large",
    learnMoreHref: "https://www.instructure.com/canvas",
    together: true,
  },
  {
    title: "Zoom",
    icon: "zoom",
    description:
      "전 세계 수억 명이 활용하는 화상 커뮤니케이션 서비스로, 원활한 온라인 강의와 회의를 지원합니다.",
    learnMoreHref: "https://www.zoom.com/?lang=ko-KO",
    together: true,
  },
  {
    title: "Slack",
    icon: "slack",
    description:
      "글로벌 기업들이 표준 협업 도구로 채택한 메신저로, 실시간 커뮤니케이션과 파일 공유를 통해 팀워크를 강화합니다.",
  },
  {
    title: "Notion",
    icon: "notion",
    description:
      "전 세계 수천만 사용자가 쓰는 올인원 워크스페이스로, 문서 · 프로젝트 · 데이터베이스 관리를 하나의 공간에서 할 수 있습니다.",
    learnMoreHref: "https://www.zoom.com/?lang=ko-KO",
    together: true,
  },
  {
    title: "GenWave",
    icon: "genwave",
    description:
      "키워드나 간단한 문장 입력만으로 이미지 · 영상 · 음악 · 텍스트 등 다양한 미디어 컨텐츠를 자동 생성해주는 멀티모달 AI 플랫폼 입니다.",
  },
  {
    title: "diquest e-Portfolio",
    icon: "diquest",
    description:
      "학생 중심의 학사정보 · LMS 종합 설계를 바탕으로 커리어 방향성과 포트폴리오를 제공하는 서비스입니다.",
  },
];

/** '와 함께' 섹션용 파트너 카드 (together: true인 항목) */
export const TOGETHER_PARTNER_CARDS: PartnerCard[] = PARTNER_CARDS.filter(
  (card) => card.together === true
);
