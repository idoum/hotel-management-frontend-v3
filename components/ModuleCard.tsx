/**
 * @file components/ModuleCard.tsx
 * @description Carte de module sobre avec léger effet hover.
 */

import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  href?: string;
};

export default function ModuleCard({ title, description, href }: Props) {
  const CardInner = (
    <div className="card h-100 module-card">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-2">{title}</h5>
        <p className="card-text text-muted flex-grow-1">{description}</p>
        {href ? <span className="btn btn-outline-primary mt-2 align-self-start">Accéder</span> : null}
      </div>
    </div>
  );

  return href ? <Link href={href} className="text-decoration-none">{CardInner}</Link> : CardInner;
}
