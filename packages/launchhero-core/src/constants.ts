/* ---
  URLS
--- */

export const DEVELOPMENT_FRONTEND_PORT = 5173

export const DEVELOPMENT_BACKEND_PORT = 3003

export const APP_URL = process.env.NODE_ENV === 'production'
  ? 'https://launchhe.ro'
  : `http://localhost:${DEVELOPMENT_FRONTEND_PORT}`

export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.launchhe.ro'
  : `http://localhost:${DEVELOPMENT_BACKEND_PORT}`

export const SOCIAL_X_URL = 'https://x.com/dherault111'

/* ---
  PROJECT
--- */

export const MAX_PROJECT_NAME_LENGTH = 128

export const MAX_PROJECT_INVITES = 20

/* ---
  ERROR CODES
--- */

export const ERROR_CODE_INTERNAL_ERROR = 'INTERNAL_ERROR'

export const ERROR_CODE_BAD_REQUEST = 'BAD_REQUEST'

export const ERROR_CODE_FORBIDDEN = 'FORBIDDEN'

export const ERROR_CODE_NO_BEARER_TOKEN = 'NO_BEARER_TOKEN'

export const ERROR_CODE_INVALID_BEARER_TOKEN = 'INVALID_BEARER_TOKEN'

export const ERROR_CODE_USER_NOT_FOUND = 'USER_NOT_FOUND'

export const ERROR_CODE_PROJECT_NOT_FOUND = 'PROJECT_NOT_FOUND'

export const ERROR_CODE_PROJECT_INVITATION_NOT_FOUND = 'PROJECT_INVITATION_NOT_FOUND'

export const ERROR_CODE_USER_NOT_PROJECT_MEMBER = 'USER_NOT_PROJECT_MEMBER'

export const ERROR_CODE_USER_NOT_PROJECT_ADMIN = 'USER_NOT_PROJECT_ADMIN'

export const ERROR_CODE_STRIPE_CUSTOMER_NOT_FOUND = 'STRIPE_CUSTOMER_NOT_FOUND'
