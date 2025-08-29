/**
 * @file app/auth/forgot-password/page.tsx
 * @description Forgot password page: posts email to /auth/forgot-password and shows success.
 */

"use client";

import { FormEvent, useState } from "react";
import { apiForgotPassword } from "@/lib/api/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null); setSuccess(null);
    try {
      await apiForgotPassword(email);
      setSuccess("Si un compte existe, un e-mail de reinitialisation a ete envoye.");
    } catch (ex: any) {
      const msg = ex?.response?.data?.error?.message || ex?.response?.data?.message || "Echec de la demande";
      setError(msg);
    } finally { setLoading(false); }
  };

  return (
    <div className="container h-100">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-12" style={{ maxWidth: 460 }}>
          <div className="card p-4 p-md-5">
            <h1 className="h4 mb-3">Mot de passe oublie</h1>

            {success && <div className="alert alert-success" role="alert">{success}</div>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Adresse e-mail</label>
                <input type="email" className="form-control" value={email}
                       onChange={e=>setEmail(e.target.value)} placeholder="vous@exemple.com" required />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Envoi..." : "Envoyer le lien"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
