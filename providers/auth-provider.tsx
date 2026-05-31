"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import {
  useGetLoggedInUser,
  getGetLoggedInUserQueryKey,
} from "@/api/generated/usuários/usuários";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { hydrateFromCookie, setUser, clearSession, token } = useAuthStore();

  useEffect(() => {
    hydrateFromCookie();
  }, []);

  const { data, isError } = useGetLoggedInUser({
    query: {
      queryKey: getGetLoggedInUserQueryKey(),
      enabled: !!token,
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  });

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  useEffect(() => {
    if (isError) clearSession();
  }, [isError]);

  return <>{children}</>;
}