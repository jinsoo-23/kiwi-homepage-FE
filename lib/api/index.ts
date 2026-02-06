export { ApiError, apiClient } from "./client";
export { createInquiry, updateMarketingConsent } from "./inquiries";
export type {
  CreateInquiryRequest,
  CreateInquiryResponse,
  UpdateMarketingConsentRequest,
  UpdateMarketingConsentResponse,
} from "./inquiries";
export { getPrivacyPolicy } from "./privacyPolicy";
export type { PrivacyPolicyResponse } from "./privacyPolicy";
