const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export class ApiError extends Error {
  constructor(
    public errorCode: string,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
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
    throw new ApiError(error.errorCode, error.message);
  }

  return res.json();
}
