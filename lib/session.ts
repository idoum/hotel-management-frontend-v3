/**
 * @file lib/session.ts
 * @description Définition des types pour l'utilisateur connecté et la session applicative.
 */

export type User = {
  id: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  isActive?: boolean;
  roles?: string[];
  permissions?: string[];
  lastLoginAt?: string | null;
};

export type Session = {
  user: User | null;
  loading: boolean;
};
