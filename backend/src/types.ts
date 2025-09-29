import type { User } from 'launchhero-core'

/* ---
  API
--- */

declare module 'express-serve-static-core' {
  interface Request {
    user: User
  }
}
