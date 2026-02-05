import type { ArchitectureCard, ArchitectureCardId, TabValue } from "@/lib/types";

export type { ArchitectureCard, ArchitectureCardId, TabValue };

export const SERVICE_CARD_IDS: ArchitectureCardId[] = [
  "studentInformationSystem",
  "learningManagementSystem",
  "contentManagementSystem",
  "videoProductionSystem",
  "virtualClassroomSystem",
  "communicationSystem",
  "collaborationSystem",
  "studentSuccessSystem",
];

export const PLATFORM_CARD_IDS: ArchitectureCardId[] = [
  "unifiedAuth",
  "dataIntegrationLayer",
  "apiGateway",
  "learningAnalyticsSystem",
];

export const FOUNDATION_CARD_IDS: ArchitectureCardId[] = [
  "learningHistoryRepository",
  "featureStore",
  "knowledgeGraphEngine",
  "llmServing",
  "ragStack",
  "multimodalAiEngine",
  "mlops",
  "analyticsMart",
];
