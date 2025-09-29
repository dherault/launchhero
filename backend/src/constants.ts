/* ---
  MODE
--- */

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

/* ---
  API
--- */

export const NO_AUTHENTICATION_ROUTES = [
  '/',
  '/emails/cron-job',
  '/stripe/webhook',
]

export const NO_JSON_PARSING_ROUTES = [
  '/stripe/webhook',
]

/* ---
  GOOGLE CLOUD
--- */

export const GOOGLE_CLOUD_PROJECT_ID = 'launch-hero'

/* ---
  SECRETS
--- */

// Firebase
export const SECRET_FIREBASE_SERVICE_ACCOUNT_KEY = 'firebase-service-account-key'

// Stripe
export const SECRET_STRIPE_SECRET_KEY = IS_PRODUCTION
  ? 'stripe-secret-key'
  : 'stripe-secret-key-development'

export const SECRET_STRIPE_WEBHOOK_SECRET = 'stripe-webhook-secret'

// Resend
export const SECRET_RESEND_API_KEY = 'resend-api-key'

// Cron jobs
export const SECRET_EMAILS_API_SECRET = 'emails-api-secret'

/* ---
  EMAILS
--- */

export const EMAIL_FROM = 'David from Launch Hero <hi@launchhe.ro>'

export const ADMIN_EMAIL = 'david@launchhe.ro'
