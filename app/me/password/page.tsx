/**
 * @file app/me/password/page.tsx
 * @description Change password page for logged-in user.
 */

"use client";

import { FormEvent, useState } from "react";
import { useSession } from "@/context/SessionContext";
import { apiChangeMyPassword } from "@/lib/api/account";
import Link from "next/link";

export default function ChangePasswordPage() {
  const { session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  if (!session.user) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="alert alert-warning mt-4" role="alert">
              Vous devez etre connecte pour changer votre mot de passe.
              {" "}<Link href="/login">Aller a la connexion</Link>.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setOk(null); setErr(null);
    if (newPassword !== confirm) {
      setErr("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    try {
      await apiChangeMyPassword(currentPassword, newPassword);
      setOk("Mot de passe mis a jour");
      setCurrentPassword(""); setNewPassword(""); setConfirm("");
    } catch (ex: any) {
      const msg = ex?.response?.data?.error?.message || ex?.response?.data?.message || "Echec de mise a jour";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 560 }}>
      <div className="card p-4 p-md-5 mt-4">
        <h1 className="h4 mb-3">Changer mon mot de passe</h1>

        {ok && <div className="alert alert-success" role="alert">{ok}</div>}
        {err && <div className="alert alert-danger" role="alert">{err}</div>}

        <form onSubmit={submit} noValidate>
          <div className="mb-3">
            <label className="form-label">Mot de passe actuel</label>
            <input
              type="password"
              className="form-control"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="********"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nouveau mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="********"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="********"
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Mise a jour..." : "Mettre a jour"}
          </button>
        </form>
      </div>
    </div>
  );
}
