import { apiClient } from "./client";

export interface PrivacyPolicyResponse {
  content: string;
  version: string;
  updatedAt: string;
}

export async function getPrivacyPolicy(): Promise<PrivacyPolicyResponse> {
  return apiClient<PrivacyPolicyResponse>("/api/v1/privacy-policy");
}
