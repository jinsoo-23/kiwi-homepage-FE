// Architecture types
export type TabValue = "service" | "platform" | "foundation";

export type ArchitectureCardId =
  | "studentInformationSystem"
  | "learningManagementSystem"
  | "contentManagementSystem"
  | "videoProductionSystem"
  | "virtualClassroomSystem"
  | "communicationSystem"
  | "collaborationSystem"
  | "studentSuccessSystem"
  | "unifiedAuth"
  | "dataIntegrationLayer"
  | "apiGateway"
  | "learningAnalyticsSystem"
  | "learningHistoryRepository"
  | "featureStore"
  | "knowledgeGraphEngine"
  | "llmServing"
  | "ragStack"
  | "multimodalAiEngine"
  | "mlops"
  | "analyticsMart";

export type ArchitectureCard = {
  id: ArchitectureCardId;
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
  /** 파트너 id (메시지 키로 사용) */
  id: PartnerIconVariant;
  /** 로고/아이콘 크기 (와 함께 섹션 등에서 큰 로고 노출 시 'large') */
  logoSize?: "default" | "large";
  /** '더 알아보기' 링크 (와 함께 섹션 등) */
  learnMoreHref?: string;
  /** true면 '와 함께' 섹션에 노출 */
  together?: boolean;
};

// UI types
export type MaxWidth = "sm" | "md" | "lg" | "xl" | "full";
