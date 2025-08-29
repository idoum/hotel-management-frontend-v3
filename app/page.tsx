/**
 * @file app/page.tsx
 * @description Accueil sobre: 9 modules en cartes.
 */

import ModuleCard from '@/components/ModuleCard';

const modules = [
  { title: 'Sécurité & Gouvernance', slug: 'security', description: 'Comptes utilisateurs, rôles, permissions, audit, politiques de sécurité.' },
  { title: 'PMS cœur', slug: 'pms', description: 'Chambres, tarifs, réservations, folios, disponibilités.' },
  { title: 'Housekeeping & Maintenance', slug: 'hk', description: 'Ménage, statut des chambres, tickets, interventions.' },
  { title: 'F&B / POS', slug: 'fnb', description: 'Bar/restaurant, menus, caisses, notes de table, intégration PMS.' },
  { title: 'Piscine/Spa', slug: 'spa', description: 'Accès, abonnements, rendez-vous, facturation.' },
  { title: 'Achats/Inventaire/Compta', slug: 'procure', description: 'Fournisseurs, stocks, achats, intégration comptable.' },
  { title: 'CRM & Fidélité', slug: 'crm', description: 'Profils clients, campagnes, points, avantages.' },
  { title: 'RH / Personnel', slug: 'hr', description: 'Dossiers employés, horaires, paie (intégrations), rôles internes.' },
  { title: 'Rapports & BI', slug: 'bi', description: 'Tableaux de bord, KPIs, exports.' },
];

export default function HomePage() {
  return (
    <div className="container">
      <div className="text-center my-4">
        <h1 className="fw-bold">Bienvenue</h1>
        <p className="text-muted">Sélectionnez un module pour commencer. La visibilité des actions dépendra de vos permissions.</p>
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
