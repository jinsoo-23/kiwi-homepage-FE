import type { PartnerIconVariant } from "@/components/ui/PartnerIcon";

export type PartnerCard = {
  title: string;
  icon: PartnerIconVariant;
  description: string;
};

export const PARTNER_CARDS: PartnerCard[] = [
  {
    title: "Canvas By Instructure",
    icon: "canvas",
    description:
      "학습관리시스템(LMS)으로 강좌 운영, 과제·퀴즈·토론, 성적 관리 등을 한 곳에서 제공합니다.",
  },
  {
    title: "Canvas IgniteAI",
    icon: "ignite_ai",
    description:
      "AI 기반 학습 지원 도구로 개인화된 학습 경험과 효율적인 교수 활동을 지원합니다.",
  },
  {
    title: "Panopto CMS",
    icon: "panopto",
    description:
      "교육용 영상 저장·스트리밍·검색을 위한 비디오 플랫폼으로 강의 녹화와 관리가 가능합니다.",
  },
  {
    title: "Zoom",
    icon: "zoom",
    description:
      "실시간 화상 강의와 웨비나, 원격 회의를 지원하는 통신 플랫폼입니다.",
  },
  {
    title: "Slack",
    icon: "slack",
    description:
      "팀 협업과 커뮤니케이션을 위한 메시징 도구로 채널 기반 소통을 지원합니다.",
  },
  {
    title: "Notion",
    icon: "notion",
    description:
      "문서·위키·프로젝트 관리를 하나의 워크스페이스에서 할 수 있는 협업 도구입니다.",
  },
  {
    title: "GenWave",
    icon: "genwave",
    description:
      "AI 기반 콘텐츠·영상 제작 및 학습 지원 솔루션을 제공합니다.",
  },
];
