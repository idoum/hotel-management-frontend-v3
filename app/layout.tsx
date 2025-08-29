/**
 * @file app/layout.tsx
 * @description Layout racine Next (App Router). Charge Bootstrap CSS, wrap SessionProvider,
 *              structure header + container.
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import type { Metadata } from 'next';
import { SessionProvider } from '@/context/SessionContext';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Hôtel Management',
  description: 'Plateforme de gestion hôtelière — Sécurité & Gouvernance, PMS, F&B, etc.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SessionProvider>
          <Header />
          <main className="py-4">
            {children}
          </main>
          <footer className="border-top py-4">
            <div className="container d-flex flex-column flex-sm-row justify-content-between">
              <span className="text-muted">© {new Date().getFullYear()} Hôtel Management</span>
              <ul className="list-inline m-0">
                <li className="list-inline-item"><a href="#" className="text-decoration-none">Confidentialité</a></li>
                <li className="list-inline-item"><a href="#" className="text-decoration-none">Conditions</a></li>
                <li className="list-inline-item"><a href="#" className="text-decoration-none">Contact</a></li>
              </ul>
            </div>
          </footer>
        </SessionProvider>
        {/* Bootstrap JS (si vous voulez le dropdown) via CDN recommandé en dev, sinon bundle custom plus tard */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
      </body>
    </html>
  );
}
