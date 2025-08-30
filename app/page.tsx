/**
 * @file app/page.tsx
 * @description Accueil contextuel: si connecte -> cartes modules; sinon -> texte explicatif.
 */

"use client";

import { useSession } from "@/context/SessionContext";
import ModuleCard from "@/components/ModuleCard";
import ModulesGuest from "@/components/ModulesGuest";

const modules = [
  { title: "Securite & Gouvernance", slug: "security", description: "Comptes utilisateurs, roles, permissions, audit, politiques." },
  { title: "PMS coeur", slug: "pms", description: "Chambres, tarifs, reservations, folios, disponibilites." },
  { title: "Housekeeping & Maintenance", slug: "hk", description: "Menage, statut des chambres, tickets, interventions." },
  { title: "F&B / POS", slug: "fnb", description: "Bar/restaurant, menus, caisses, integration PMS." },
  { title: "Piscine/Spa", slug: "spa", description: "Acces, abonnements, rendez-vous, facturation." },
  { title: "Achats/Inventaire/Compta", slug: "procure", description: "Fournisseurs, stocks, achats, integration comptable." },
  { title: "CRM & Fidelite", slug: "crm", description: "Profils clients, campagnes, points, avantages." },
  { title: "RH / Personnel", slug: "hr", description: "Dossiers employes, horaires, roles internes." },
  { title: "Rapports & BI", slug: "bi", description: "Tableaux de bord, KPIs, exports." }
];

export default function HomePage() {
  const { session } = useSession();

  // Non connecte -> vue texte (aucun bouton)
  if (!session.user) {
    return <ModulesGuest />;
  }

  // Connecte -> cartes de navigation vers les modules
  return (
    <div className="container">
      <div className="text-center my-4">
        <h1 className="fw-bold">Bienvenue</h1>
        <p className="text-muted">Selectionnez un module pour commencer.</p>
      </div>

      <div className="row g-3">
        {modules.map((m) => (
          <div className="col-12 col-sm-6 col-lg-4" key={m.slug}>
            <ModuleCard title={m.title} description={m.description} href={`/${m.slug}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
