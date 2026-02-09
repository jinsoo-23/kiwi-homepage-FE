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
  hasPreviousInquiry: boolean;
  message?: string;
}

export interface ConsentStatus {
  consentType: string;
  consented: boolean;
  updatedAt: string;
}

export interface GetConsentsResponse {
  email: string;
  consents: ConsentStatus[];
}

export interface UpdateConsentRequest {
  email: string;
  phone: string;
  consentType: "MARKETING" | "PRIVACY";
  consented: boolean;
}

export interface UpdateConsentResponse {
  consentType: string;
  consented: boolean;
  updatedAt: string;
}

export async function createInquiry(data: CreateInquiryRequest): Promise<CreateInquiryResponse> {
  return apiClient<CreateInquiryResponse>("/api/v1/inquiries", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getConsents(email: string, phone: string): Promise<GetConsentsResponse> {
  const params = new URLSearchParams({ email, phone });
  return apiClient<GetConsentsResponse>(`/api/v1/consents?${params.toString()}`, {
    method: "GET",
  });
}

export async function updateConsent(data: UpdateConsentRequest): Promise<UpdateConsentResponse> {
  return apiClient<UpdateConsentResponse>("/api/v1/consents", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
