/* ---
  COMMON
--- */

export const IS_PRODUCTION = import.meta.env.PROD

export const DEFAULT_TITLE = 'Submit Hero'

export const APP_URL = IS_PRODUCTION
  ? 'https://submithe.ro'
  : 'http://localhost:5173'

/* ---
  AUTHENTICATION
--- */

export const MIN_PASSWORD_LENGTH = 8

export const MAX_PASSWORD_LENGTH = 1024

export const AUTHENTICATION_ERRORS = {
  default: 'An error occurred, please try again',
  terms: 'You must accept the Terms and Conditions',
  'auth/email-already-in-use': 'This email is already in use',
  'auth/invalid-email': 'You must provide a valid email',
  'auth/weak-password': 'Your password must be at least 8 characters',
  'auth/user-disabled': 'This account has been disabled',
  'auth/user-not-found': 'This account does not exist, please sign up',
  'auth/wrong-password': 'Your password is incorrect',
  'auth/invalid-credential': 'Your password is incorrect',
}

/* ---
  PROJECT
--- */

export const MAX_PROJECT_NAME_LENGTH = 128

/* ---
  LEGAL
--- */

export const LEGAL_COMPANY_NAME = 'David Hérault micro-entreprise'

export const LEGAL_EFFECTIVE_DATE = '27 September 2025'

export const LEGAL_UPDATED_DATE = '27 September 2025'

/* ---
  SUPPORT
--- */

export const SUPPORT_FULL_NAME = 'David Hérault'

export const SUPPORT_EMAIL = 'david@submithe.ro'

export const SUPPORT_METING_URL = 'https://calendly.com/david-submithe/30min'

/* ---
  OTHER
--- */

export const NULL_DOCUMENT_ID = '_NULL_'
