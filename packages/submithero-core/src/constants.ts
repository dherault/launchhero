/* ---
  URLS
--- */

export const DEVELOPMENT_FRONTEND_PORT = 5173

export const APP_URL = process.env.NODE_ENV === 'production'
  ? 'https://submithe.ro'
  : `http://localhost:${DEVELOPMENT_FRONTEND_PORT}`

export const SOCIAL_X_URL = 'https://x.com/dherault111'
