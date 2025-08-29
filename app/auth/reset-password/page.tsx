/**
 * @file app/auth/reset-password/page.tsx
 * @description Reset password page: reads token from search params and posts to /auth/reset-password.
 */

"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiResetPassword } from "@/lib/api/auth";

export default function ResetPasswordPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const token = useMemo(() => sp.get("token") || "", [sp]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null); setSuccess(null);
    if (!token) { setError("Lien invalide"); setLoading(false); return; }
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas"); setLoading(false); return; }
    try {
      await apiResetPassword(token, password);
      setSuccess("Mot de passe reinitialise. Vous pouvez vous connecter.");
      setTimeout(() => router.push("/login"), 1200);
    } catch (ex: any) {
      const msg = ex?.response?.data?.error?.message || ex?.response?.data?.message || "Echec de reinitialisation";
      setError(msg);
    } finally { setLoading(false); }
  };

  return (
    <div className="container h-100">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-12" style={{ maxWidth: 460 }}>
          <div className="card p-4 p-md-5">
            <h1 className="h4 mb-3">Reinitialiser le mot de passe</h1>
            {!token && <div className="alert alert-warning" role="alert">Token manquant</div>}
            {success && <div className="alert alert-success" role="alert">{success}</div>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Nouveau mot de passe</label>
                <input type="password" className="form-control" value={password}
                       onChange={e=>setPassword(e.target.value)} placeholder="********" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmer</label>
                <input type="password" className="form-control" value={confirm}
                       onChange={e=>setConfirm(e.target.value)} placeholder="********" required />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading || !token}>
                {loading ? "Envoi..." : "Valider"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
