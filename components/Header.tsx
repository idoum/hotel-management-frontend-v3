/**
 * @file components/Header.tsx
 * @description Barre d'entête: logo, bouton Connexion (hors session) ou menu Profil (en session).
 */

'use client';

import Link from 'next/link';
import { useSession } from '@/context/SessionContext';

export default function Header() {
  const { session, logout } = useSession();
  const fullName = session.user ? [session.user.firstName, session.user.lastName].filter(Boolean).join(' ') : '';

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">Hôtel Management</Link>

        <div className="ms-auto d-flex align-items-center gap-2">
          {!session.user && !session.loading && (
            <Link href="/login" className="btn btn-primary">Connexion</Link>
          )}

          {session.user && (
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {fullName || session.user.email}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" href="/me">Mon profil</Link></li>
                <li><button className="dropdown-item" onClick={() => logout()}>Déconnexion</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
