"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  exportInquiries,
  type InquiryStatus,
  type InquiryType,
  type InquiryListParams,
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

export default function AdminInquiriesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading, isAuthenticated, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "">("");
  const [marketingConsentFilter, setMarketingConsentFilter] = useState<
    "true" | "false" | ""
  >("");
  const [limit, setLimit] = useState<5 | 10 | 25>(10);
  const [page, setPage] = useState(1);

  const params: InquiryListParams = {
    page,
    limit,
    ...(search && { search }),
    ...(statusFilter && { status: statusFilter }),
    ...(marketingConsentFilter && {
      marketingConsent: marketingConsentFilter === "true",
    }),
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "inquiries", params],
    queryFn: () => getInquiries(params),
    enabled: isAuthenticated,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: InquiryStatus }) =>
      updateInquiryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "inquiries"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "inquiries"] });
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    await statusMutation.mutateAsync({ id, status: newStatus });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deleteMutation.mutateAsync(id);
  };

  const handleExport = async () => {
    try {
      await exportInquiries();
    } catch {
      alert("엑셀 다운로드에 실패했습니다.");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">문의 관리</h1>
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

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이름, 이메일, 기업명 검색"
              className="w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              검색
            </button>
          </form>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as InquiryStatus | "");
              setPage(1);
            }}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">전체 상태</option>
            <option value="PENDING">대기</option>
            <option value="COMPLETED">완료</option>
          </select>

          <select
            value={marketingConsentFilter}
            onChange={(e) => {
              setMarketingConsentFilter(
                e.target.value as "true" | "false" | ""
              );
              setPage(1);
            }}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">광고 수신 동의 (전체)</option>
            <option value="true">동의</option>
            <option value="false">미동의</option>
          </select>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value) as 5 | 10 | 25);
              setPage(1);
            }}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={5}>5개씩</option>
            <option value={10}>10개씩</option>
            <option value={25}>25개씩</option>
          </select>

          <button
            onClick={handleExport}
            className="ml-auto rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            엑셀 다운로드
          </button>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4 text-red-600">
            데이터를 불러오는데 실패했습니다.
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      이름
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      기업명
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      이메일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      문의 유형
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      광고 수신
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      등록일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.data.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() =>
                        router.push(`/admin/inquiries/${inquiry.id}`)
                      }
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {inquiry.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {inquiry.companyName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {inquiry.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {INQUIRY_TYPE_LABELS[inquiry.inquiryType]}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${STATUS_COLORS[inquiry.status]}`}
                        >
                          {STATUS_LABELS[inquiry.status]}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            inquiry.marketingConsent
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {inquiry.marketingConsent ? "동의" : "미동의"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {new Date(inquiry.createdAt).toLocaleDateString("ko-KR")}
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex gap-2">
                          {inquiry.status === "PENDING" ? (
                            <button
                              onClick={() =>
                                handleStatusChange(inquiry.id, "COMPLETED")
                              }
                              disabled={statusMutation.isPending}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              완료
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleStatusChange(inquiry.id, "PENDING")
                              }
                              disabled={statusMutation.isPending}
                              className="text-yellow-600 hover:text-yellow-800"
                            >
                              대기
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(inquiry.id)}
                            disabled={deleteMutation.isPending}
                            className="text-red-600 hover:text-red-800"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {data?.data.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-12 text-center text-sm text-gray-500"
                      >
                        문의가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data && data.pagination.totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  전체 {data.pagination.total}개 중{" "}
                  {(page - 1) * limit + 1}-
                  {Math.min(page * limit, data.pagination.total)}개
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    이전
                  </button>
                  <span className="flex items-center px-3 text-sm">
                    {page} / {data.pagination.totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPage((p) =>
                        Math.min(data.pagination.totalPages, p + 1)
                      )
                    }
                    disabled={page === data.pagination.totalPages}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    다음
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
