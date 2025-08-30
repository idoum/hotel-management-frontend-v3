/**
 * @file components/ModulesGuest.tsx
 * @description Vue publique (non connecte) : description des 9 modules sans cartes ni boutons.
 */

export default function ModulesGuest() {
  const sections: { title: string; bullets: string[] }[] = [
    {
      title: "Securite & Gouvernance",
      bullets: [
        "Authentification (JWT access + refresh, cookies httpOnly)",
        "RBAC: roles, permissions, controle d acces granulaire",
        "Journaux d audit (action_logs): qui a fait quoi et quand",
        "Politiques: complexite MDP, duree session, verrouillage"
      ]
    },
    {
      title: "PMS coeur",
      bullets: [
        "Chambres, types, calendriers et disponibilites",
        "Tarifs, restrictions, plans tarifaires",
        "Reservations, check-in/out, folios et reglements"
      ]
    },
    {
      title: "Housekeeping & Maintenance",
      bullets: [
        "Statut des chambres (sale, propre, en maintenance)",
        "Taches menage, tournantes, mini-bar",
        "Tickets et interventions de maintenance"
      ]
    },
    {
      title: "F&B / POS",
      bullets: [
        "Cartes/menus, prise de commande, notes de table",
        "Integration folio chambre, transfert sur PMS",
        "Rapports vente/journee POS"
      ]
    },
    {
      title: "Piscine/Spa",
      bullets: [
        "Reservations de soins, planning therapeutes",
        "Abonnements, acces, capacite",
        "Facturation et integration PMS"
      ]
    },
    {
      title: "Achats/Inventaire/Compta",
      bullets: [
        "Fournisseurs, demandes d achat, commandes",
        "Stocks, mouvements, inventaires",
        "Exports comptables / plan de comptes"
      ]
    },
    {
      title: "CRM & Fidelite",
      bullets: [
        "Profils clients, preferences, GDPR",
        "Segments, campagnes, emailing",
        "Points et avantages fidelite"
      ]
    },
    {
      title: "RH / Personnel",
      bullets: [
        "Dossiers employes, documents",
        "Plannings, pointage (T&A)",
        "Profils internes et habilitations"
      ]
    },
    {
      title: "Rapports & BI",
      bullets: [
        "Tableaux de bord et KPIs",
        "Exports CSV/XLS, programmations",
        "Connecteurs BI (option)"
      ]
    }
  ];

  return (
    <div className="container">
      <div className="text-center my-4">
        <h1 className="fw-bold">Hotel Management</h1>
        <p className="text-muted">
          Explorez les capacites du systeme. Connectez-vous pour acceder aux espaces de gestion.
        </p>
      </div>

      {sections.map((s, i) => (
        <section key={i} className="mb-4">
          <h2 className="h5 mb-2">{s.title}</h2>
          <ul className="mb-0">
            {s.bullets.map((b, j) => (<li key={j}>{b}</li>))}
          </ul>
          <hr className="mt-3" />
        </section>
      ))}
    </div>
  );
}
