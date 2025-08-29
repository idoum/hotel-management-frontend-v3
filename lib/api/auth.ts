/**
 * @file lib/api/auth.ts
 * @description API client for auth endpoints: login, refresh, logout, me, forgot, reset.
 */

import http from "@/lib/http";

type LoginPayload = { email: string; password: string };

type LoginResponse = {
  accessToken?: string;
  access_token?: string;
  user?: unknown;
};

export async function apiLogin(p: LoginPayload): Promise<LoginResponse> {
  const r = await http.post("/auth/login", p);
  return r.data;
}

export async function apiRefresh(): Promise<{ accessToken?: string; access_token?: string }> {
  const r = await http.post("/auth/refresh");
  return r.data;
}

export async function apiLogout(): Promise<void> {
  await http.post("/auth/logout");
}

export async function apiMe(): Promise<unknown> {
  const r = await http.get("/me");
  return r.data?.data ?? r.data;
}

export async function apiForgotPassword(email: string): Promise<void> {
  await http.post("/auth/forgot-password", { email });
}

export async function apiResetPassword(token: string, newPassword: string): Promise<void> {
  await http.post("/auth/reset-password", { token, password: newPassword });
}
