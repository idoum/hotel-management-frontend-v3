/**
 * @file lib/api/account.ts
 * @description Account API (change own password).
 */

import http from "@/lib/http";

/**
 * apiChangeMyPassword
 * @description Tries POST /auth/change-password; falls back to PATCH/PUT /users/me/password.
 */
export async function apiChangeMyPassword(currentPassword: string, newPassword: string): Promise<void> {
  // primary endpoint (recommended)
  try {
    await http.post("/auth/change-password", {
      currentPassword,
      newPassword
    });
    return;
  } catch (e: any) {
    const st = e?.response?.status;
    // try fallbacks only if method not found / not allowed
    if (st !== 404 && st !== 405) throw e;
  }

  // fallback 1: PATCH /users/me/password
  try {
    await http.patch("/users/me/password", {
      currentPassword,
      newPassword
    });
    return;
  } catch (e: any) {
    const st = e?.response?.status;
    if (st !== 404 && st !== 405) throw e;
  }

  // fallback 2: PUT /users/me/password
  await http.put("/users/me/password", {
    currentPassword,
    newPassword
  });
}
