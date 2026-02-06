"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import {
  getInquiry,
  updateInquiryStatus,
  deleteInquiry,
  type InquiryStatus,
  type InquiryType,
} from "@/lib/api/admin";

const STATUS_LABELS: Record<InquiryStatus, string> = {
  PENDING: "대기",
  COMPLETED: "완료",
};

const STATUS_COLORS: Record<InquiryStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  COMPLETED: "bg-green-100 text-green-800",
};

const INQUIRY_TYPE_LABELS: Record<InquiryType, string> = {
  kiwi: "Kiwi 도입 문의",
  kiwiFeature: "Kiwi 기능 문의",
  kiwiPartnership: "파트너십 문의",
};

export default function AdminInquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading: authLoading, isAuthenticated, logout, user } = useAuth();

  const { data: inquiry, isLoading, error } = useQuery({
    queryKey: ["admin", "inquiry", id],
    queryFn: () => getInquiry(id),
    enabled: isAuthenticated,
  });

  const statusMutation = useMutation({
    mutationFn: (status: InquiryStatus) => updateInquiryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "inquiry", id] });
      queryClient.invalidateQueries({ queryKey: ["admin", "inquiries"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "inquiries"] });
      router.replace("/admin/inquiries");
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleStatusChange = async (newStatus: InquiryStatus) => {
    await statusMutation.mutateAsync(newStatus);
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deleteMutation.mutateAsync();
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-md bg-red-50 p-4 text-red-600">
          문의를 불러오는데 실패했습니다.
        </div>
      </div>
    );
  }

  if (!inquiry) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin/inquiries")}
              className="text-gray-600 hover:text-gray-900"
            >
              &larr; 목록으로
            </button>
            <h1 className="text-xl font-bold text-gray-900">문의 상세</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          {/* Status & Actions */}
          <div className="flex items-center justify-between border-b bg-gray-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">상태:</span>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${STATUS_COLORS[inquiry.status]}`}
              >
                {STATUS_LABELS[inquiry.status]}
              </span>
            </div>
            <div className="flex gap-2">
              {inquiry.status === "PENDING" ? (
                <button
                  onClick={() => handleStatusChange("COMPLETED")}
                  disabled={statusMutation.isPending}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  완료로 변경
                </button>
              ) : (
                <button
                  onClick={() => handleStatusChange("PENDING")}
                  disabled={statusMutation.isPending}
                  className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50"
                >
                  대기로 변경
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                삭제
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">이름</dt>
                <dd className="mt-1 text-sm text-gray-900">{inquiry.name}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">기업/기관명</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {inquiry.companyName}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">이메일</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {inquiry.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">연락처</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {inquiry.phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">문의 유형</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {INQUIRY_TYPE_LABELS[inquiry.inquiryType]}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">등록일</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(inquiry.createdAt).toLocaleString("ko-KR")}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">문의 내용</dt>
                <dd className="mt-1 whitespace-pre-wrap rounded-md bg-gray-50 p-4 text-sm text-gray-900">
                  {inquiry.message}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">
                  개인정보 수집 동의
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {inquiry.privacyConsent ? "동의함" : "동의안함"}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">
                  마케팅 수신 동의
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {inquiry.marketingConsent ? "동의함" : "동의안함"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
