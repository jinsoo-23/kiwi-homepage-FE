"use client";

import {
  createContext,
  useContext,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMe,
  login as apiLogin,
  logout as apiLogout,
  refreshToken,
  AdminApiError,
  type AdminUser,
  type LoginRequest,
} from "@/lib/api/admin";

interface AuthContextValue {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const hasTriedRefresh = useRef(false);

  const { data, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        return await getMe();
      } catch (err) {
        if (
          err instanceof AdminApiError &&
          err.status === 401 &&
          !hasTriedRefresh.current
        ) {
          hasTriedRefresh.current = true;
          try {
            await refreshToken();
            return await getMe();
          } catch {
            throw err;
          }
        }
        throw err;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const login = useCallback(
    async (data: LoginRequest) => {
      const response = await apiLogin(data);
      hasTriedRefresh.current = false;
      queryClient.setQueryData(["auth", "me"], { user: response.user });
    },
    [queryClient]
  );

  const logout = useCallback(async () => {
    await apiLogout();
    hasTriedRefresh.current = false;
    queryClient.setQueryData(["auth", "me"], null);
    queryClient.removeQueries({ queryKey: ["admin"] });
  }, [queryClient]);

  const user = data?.user ?? null;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
