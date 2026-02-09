export { ApiError, apiClient } from "./client";
export { createInquiry, getConsents, updateConsent } from "./inquiries";
export type {
  CreateInquiryRequest,
  CreateInquiryResponse,
  ConsentStatus,
  GetConsentsResponse,
  UpdateConsentRequest,
  UpdateConsentResponse,
} from "./inquiries";
export { getPrivacyPolicy } from "./privacyPolicy";
export type { PrivacyPolicyResponse } from "./privacyPolicy";
