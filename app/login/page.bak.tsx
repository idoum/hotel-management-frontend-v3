/**
 * @file app/login/page.tsx
 * @description Page de connexion. Centrée verticalement entre header et footer, design épuré & sobre.
 */

'use client';

import { FormEvent, useState } from 'react';
import { useSession } from '@/context/SessionContext';

export default function LoginPage() {
  const { login, session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * handleSubmit
   * @description Soumet la connexion: POST /auth/login -> /me -> redirect '/'
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="container h-100">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-12" style={{ maxWidth: 460 }}>
          <div className="card p-4 p-md-5">
            <div className="text-center mb-4">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 56, height: 56,
                  background: 'linear-gradient(135deg, rgba(59,130,246,.15), rgba(16,185,129,.15))',
                  border: '1px solid rgba(15, 23, 42, 0.06)'
                }}
                aria-hidden
              >
                ���
              </span>
              <h1 className="h3 fw-bold mt-3 mb-1">Connexion</h1>
              <p className="text-muted m-0">Accédez à votre espace sécurisé</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Adresse e-mail</label>
                <input
                  type="email"
                  className="form-control"
                  autoFocus
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label" htmlFor="remember">Se souvenir de moi</label>
                </div>
                <a href="#" className="small">Mot de passe oublié ?</a>
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={session.loading}>
                {session.loading ? 'Connexion…' : 'Se connecter'}
              </button>
            </form>
          </div>

          <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: 13 }}>
            Besoin d’un accès ? Contactez un administrateur.
          </p>
        </div>
      </div>
    </div>
  );
}
