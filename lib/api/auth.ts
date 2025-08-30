/**
 * @file lib/api/auth.ts
 * @description API client for auth endpoints: login, refresh, logout, me, forgot, reset.
 */
import http from "@/lib/http";

function pickAccessToken(obj: any): string | null {
  if (!obj) return null;
  return (
    obj.accessToken ??
    obj.access_token ??
    obj.data?.accessToken ??
    obj.data?.access_token ??
    obj.token ??
    null
  );
}

type LoginPayload = { email: string; password: string };

export async function apiLogin(p: LoginPayload): Promise<{ accessToken: string | null; raw: any }> {
  const r = await http.post("/auth/login", p);
  return { accessToken: pickAccessToken(r.data), raw: r.data };
}

export async function apiRefresh(): Promise<{ accessToken: string | null; raw: any }> {
  const r = await http.post("/auth/refresh");
  return { accessToken: pickAccessToken(r.data), raw: r.data };
}

export async function apiLogout(): Promise<void> {
  await http.post("/auth/logout");
}

export async function apiMe(): Promise<any> {
  const r = await http.get("/me");
  return r.data?.data ?? r.data;
}

export async function apiForgotPassword(email: string): Promise<void> {
  await http.post("/auth/forgot-password", { email });
}

export async function apiResetPassword(token: string, newPassword: string): Promise<void> {
  await http.post("/auth/reset-password", { token, password: newPassword });
}
