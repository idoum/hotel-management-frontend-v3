/**
 * @file lib/can.ts
 * @description Petit helper d'UI pour vérifier la présence d'une permission.
 */

/**
 * can
 * @description Retourne true si la permission demandé est incluse dans la liste effective.
 * @param perm Permission à vérifier (ex: 'users.create')
 * @param perms Tableau des permissions de l'utilisateur
 */
export function can(perm: string, perms?: string[]) {
  if (!perms || perms.length === 0) return false;
  return perms.includes(perm);
}
