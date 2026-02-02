export type TabValue = "service" | "platform" | "foundation";

export type ArchitectureCard = {
  title: string;
  description: string;
};

export const SERVICE_CARDS: ArchitectureCard[] = [
  { title: "학사관리시스템", description: "수강신청·성적 등 학사행정 지원" },
  { title: "학습관리시스템", description: "개별적인 강좌 관리와 학습 과정 운영 제공" },
  { title: "컨텐츠관리시스템", description: "학습 자료와 교육 컨텐츠 저장·배포" },
  { title: "영상제작시스템", description: "교육용 영상 촬영·편집 도구, AI 영상제작" },
  { title: "화상강의시스템", description: "실시간 온라인 강의 및 세미나 진행" },
  { title: "커뮤니케이션시스템", description: "학습자·교수자 간 메세지 및 알림 전달" },
  { title: "협업 시스템", description: "공동 프로젝트와 자료 공유 지원" },
  { title: "학생성공시스템", description: "맞춤형 상담·지원 (전공설계지원, e포트폴리오)" },
];

export const PLATFORM_CARDS: ArchitectureCard[] = [
  { title: "통합인증·권한", description: "한 번의 로그인으로 모든 서비스 이용" },
  { title: "데이터 통합 레이어", description: "여러 시스템의 데이터를 통합 관리" },
  { title: "API Gateway", description: "다양한 서비스와 데이터를 안전하게 연결하는 통로" },
  { title: "학습분석시스템", description: "학습 데이터를 분석해 개인화 추천과 성과 예측" },
];

export const FOUNDATION_CARDS: ArchitectureCard[] = [
  { title: "학습이력 저장소", description: "학습분석을 위한 데이터를 표준화하여 저장·관리" },
  { title: "Feature Store", description: "AI 분석에 필요한 데이터 특성을 저장·공유" },
  { title: "지식그래프 엔진", description: "사용자 과목 자료 간의 관계망 기반 검색 추천 추론" },
  { title: "대규모언어모델 서빙", description: "인공지능 대규모언어모델을 실시간으로 활용" },
  { title: "RAG 스택", description: "지식검색과 AI 답변의 정확도를 높히는 기술" },
  { title: "멀티모달 AI 엔진", description: "텍스트·음성·이미지 영상 등 다양한 데이터를 통합 활용" },
  { title: "MLOps", description: "AI 모델 개발·배포 모니터링 자동화" },
  { title: "Analytics Mart", description: "KPI와 지표를 집계해 역사결정 지원" },
];
