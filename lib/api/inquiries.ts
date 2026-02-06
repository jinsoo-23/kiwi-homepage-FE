import { apiClient } from "./client";

export interface CreateInquiryRequest {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  marketingConsent: boolean;
  privacyConsent: boolean;
}

export interface CreateInquiryResponse {
  id: string;
  createdAt: string;
}

export interface UpdateMarketingConsentRequest {
  email: string;
  phone: string;
}

export interface UpdateMarketingConsentResponse {
  marketingConsent: boolean;
}

export async function createInquiry(data: CreateInquiryRequest): Promise<CreateInquiryResponse> {
  return apiClient<CreateInquiryResponse>("/api/v1/inquiries", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateMarketingConsent(
  data: UpdateMarketingConsentRequest
): Promise<UpdateMarketingConsentResponse> {
  return apiClient<UpdateMarketingConsentResponse>("/api/v1/inquiries/marketing-consent", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
