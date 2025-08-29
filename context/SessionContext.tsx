/**
 * @file context/SessionContext.tsx
 * @description Lazy session provider: no refresh on mount. Integrates login/logout/me and exposes error state.
 */

"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { setAccessToken } from "@/lib/http";
import type { Session, User } from "@/lib/session";
import { useRouter, usePathname } from "next/navigation";
import { apiLogin, apiLogout, apiMe } from "@/lib/api/auth";

type SessionContextValue = {
  session: Session & { error?: string | null };
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setProfileName: (firstName: string, lastName: string) => void;
  clearError: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

async function fetchMe(): Promise<User> {
  const me = await apiMe();
  return me as User;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true); setError(null);
    try {
      const res = await apiLogin({ email, password });
      const token = res.accessToken ?? res.access_token ?? null;
      setAccessToken(token);
      const me = await fetchMe();
      setUser(me);
      router.push("/");
    } catch (e: unknown) {
      const err = e as { response?: { data?: { error?: { message?: string }, message?: string } } };
      const msg = err.response?.data?.error?.message || err.response?.data?.message || "Echec de connexion";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    try { await apiLogout(); } catch {}
    setAccessToken(null);
    setUser(null);
    if (pathname !== "/login") router.push("/login");
  }, [pathname, router]);

  const refreshProfile = useCallback(async () => {
    const me = await fetchMe();
    setUser(me);
  }, []);

  const setProfileName = useCallback((firstName: string, lastName: string) => {
    setUser(prev => prev ? { ...prev, firstName, lastName } : prev);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<SessionContextValue>(() => ({
    session: { user, loading, error },
    login, logout, refreshProfile, setProfileName, clearError
  }), [user, loading, error, login, logout, refreshProfile, setProfileName, clearError]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
