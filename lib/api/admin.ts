const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const ADMIN_API = `${API_BASE_URL}/api/v1/admin`;

export class AdminApiError extends Error {
  constructor(
    public errorCode: string,
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "AdminApiError";
  }
}

async function adminFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${ADMIN_API}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      errorCode: "UNKNOWN_ERROR",
      message: "알 수 없는 오류가 발생했습니다.",
    }));
    throw new AdminApiError(error.errorCode, error.message, res.status);
  }

  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return res.json();
  }

  return {} as T;
}

// 타입 정의
export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AdminUser;
}

export interface MeResponse {
  user: AdminUser;
}

export type InquiryStatus = "PENDING" | "COMPLETED";
export type InquiryType = "kiwi" | "kiwiFeature" | "kiwiPartnership";

export interface InquiryListItem {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  status: InquiryStatus;
  marketingConsent: boolean;
  createdAt: string;
}

export interface Inquiry extends InquiryListItem {
  message: string;
  marketingConsent: boolean;
  privacyConsent: boolean;
}

export interface InquiryListResponse {
  data: InquiryListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface InquiryListParams {
  page?: number;
  limit?: 5 | 10 | 25;
  search?: string;
  status?: InquiryStatus;
  inquiryType?: InquiryType;
  marketingConsent?: boolean;
}

// Auth API
export async function login(data: LoginRequest): Promise<LoginResponse> {
  return adminFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logout(): Promise<void> {
  await adminFetch<{ success: boolean }>("/auth/logout", {
    method: "POST",
  });
}

export async function refreshToken(): Promise<void> {
  await adminFetch<{ success: boolean }>("/auth/refresh", {
    method: "POST",
  });
}

export async function getMe(): Promise<MeResponse> {
  return adminFetch<MeResponse>("/auth/me");
}

// Inquiries API
export async function getInquiries(
  params: InquiryListParams = {}
): Promise<InquiryListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.search) searchParams.set("search", params.search);
  if (params.status) searchParams.set("status", params.status);
  if (params.inquiryType) searchParams.set("inquiryType", params.inquiryType);
  if (params.marketingConsent !== undefined)
    searchParams.set("marketingConsent", String(params.marketingConsent));

  const query = searchParams.toString();
  return adminFetch<InquiryListResponse>(
    `/inquiries${query ? `?${query}` : ""}`
  );
}

export async function getInquiry(id: string): Promise<Inquiry> {
  return adminFetch<Inquiry>(`/inquiries/${id}`);
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus
): Promise<{ id: string; status: InquiryStatus }> {
  return adminFetch<{ id: string; status: InquiryStatus }>(
    `/inquiries/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }
  );
}

export async function deleteInquiry(id: string): Promise<void> {
  await adminFetch<{ success: boolean }>(`/inquiries/${id}`, {
    method: "DELETE",
  });
}

export function getExportUrl(): string {
  return `${ADMIN_API}/inquiries/export`;
}

export async function exportInquiries(): Promise<void> {
  const res = await fetch(`${ADMIN_API}/inquiries/export`, {
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      errorCode: "EXPORT_FAILED",
      message: "엑셀 다운로드에 실패했습니다.",
    }));
    throw new AdminApiError(error.errorCode, error.message, res.status);
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  const contentDisposition = res.headers.get("content-disposition");
  const filenameMatch = contentDisposition?.match(/filename="?(.+)"?/);
  a.download = filenameMatch?.[1] || `inquiries_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}.xlsx`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
