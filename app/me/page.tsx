/**
 * @file app/me/page.tsx
 * @description Simple profile page using session context. If no user, shows a hint to login.
 */

"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/context/SessionContext";
import { apiMe } from "@/lib/api/auth";

export default function MePage() {
  const { session } = useSession();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If user is null but a session might exist (e.g., you want to try),
    // you could call apiMe() here. We keep it silent if it fails.
    if (!session.user) {
      (async () => {
        try { await apiMe(); } catch (e) { setError("Non connecte"); }
      })();
    }
  }, [session.user]);

  if (!session.user) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="alert alert-warning mt-4" role="alert">
              Vous devez vous connecter pour voir votre profil. <a href="/login">Aller a la connexion</a>.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const u = session.user;
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card p-4">
            <h2 className="h4 mb-3">Mon profil</h2>
            <div className="row g-3">
              <div className="col-sm-6"><strong>Nom</strong><div>{u.lastName ?? ""}</div></div>
              <div className="col-sm-6"><strong>Prenom</strong><div>{u.firstName ?? ""}</div></div>
              <div className="col-sm-6"><strong>Email</strong><div>{u.email}</div></div>
              <div className="col-sm-6"><strong>Actif</strong><div>{u.isActive ? "Oui" : "Non"}</div></div>
              <div className="col-12"><strong>Roles</strong><div>{(u.roles ?? []).join(", ") || "-"}</div></div>
              <div className="col-12"><strong>Permissions</strong><div className="small text-muted">{(u.permissions ?? []).join(", ") || "-"}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
