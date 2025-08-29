/**
 * @file lib/http.ts
 * @description Instance Axios centralisée : baseURL, withCredentials, gestion du bearer accessToken,
 *              intercepteur 401 -> tente un refresh (/auth/refresh) -> rejoue la requête initiale.
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

let accessToken: string | null = null;
/**
 * setAccessToken
 * @description Dépose en mémoire le token d'accès courant (non persistant).
 */
export function setAccessToken(token: string | null) {
  accessToken = token;
}

/**
 * getAccessToken
 * @description Retourne le token d'accès en mémoire.
 */
export function getAccessToken() {
  return accessToken;
}

let refreshPromise: Promise<void> | null = null;

/**
 * createHttp
 * @description Crée une instance Axios préconfigurée pour l'API backend.
 */
function createHttp(): AxiosInstance {
  const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3005/api',
    withCredentials: true // nécessaire pour que le cookie HttpOnly de refresh circule
  });

  // Ajout du bearer token à chaque requête sortante (si présent)
  http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers = config.headers ?? {};
      // On n’écrase pas Authorization si déjà posé de manière spécifique
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  });

  // Gestion des 401 : on tente une fois un refresh, puis on rejoue la requête
  http.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const original = error.config as (InternalAxiosRequestConfig & { __isRetryRequest?: boolean }) | undefined;
      const status = error.response?.status;

      // Si 401 et pas déjà retenté, on essaie de rafraîchir l'access token
      if (status === 401 && original && !original.__isRetryRequest) {
        // Évite les refresh concurrents : on mutualise via refreshPromise
        if (!refreshPromise) {
          refreshPromise = (async () => {
            try {
              const r = await http.post('/auth/refresh'); // le cookie HttpOnly est envoyé automatiquement
              // Hypothèse de réponse: { accessToken: string }
              const newToken = (r.data as any)?.accessToken ?? (r.data as any)?.access_token ?? null;
              setAccessToken(newToken);
            } finally {
              // On libère quoi qu'il arrive
              refreshPromise = null;
            }
          })();
        }
        await refreshPromise;

        // Rejoue la requête initiale une seule fois
        original.__isRetryRequest = true;
        if (accessToken) {
          original.headers = original.headers ?? {};
          original.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return http(original);
      }

      // Sinon on rejette l'erreur
      return Promise.reject(error);
    }
  );

  return http;
}

const http = createHttp();
export default http;
