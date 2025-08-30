/**
 * @file context/SessionContext.tsx
 * @description Lazy session with robust login: if no token from /auth/login, try /auth/refresh (cookie).
 */
"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { setAccessToken } from "@/lib/http";
import type { Session, User } from "@/lib/session";
import { useRouter, usePathname } from "next/navigation";
import { apiLogin, apiLogout, apiMe, apiRefresh } from "@/lib/api/auth";

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
  return me;
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
      const loginRes = await apiLogin({ email, password });
      let token = loginRes.accessToken;
      if (!token) {
        // fallback: essayer /auth/refresh (si cookie posé par le backend)
        try {
          const ref = await apiRefresh();
          token = ref.accessToken;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          // ignore
        }
      }
      if (!token) {
        console.warn("No access token from login nor refresh. Response:", loginRes.raw);
        throw new Error("Aucun jeton d'acces recu");
      }

      setAccessToken(token);
      const me = await fetchMe();
      setUser(me);
      router.push("/");
    } catch (e: any) {
      const msg = e?.response?.data?.error?.message || e?.response?.data?.message || e?.message || "Echec de connexion";
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
