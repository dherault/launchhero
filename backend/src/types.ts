import type { User } from 'launchhero-core'

/* ---
  API RESPONSES
--- */

export interface SuccessResponse<T = void> {
  status: 'success'
  data?: T
}

export interface ErrorResponse {
  status: 'error'
  code: string
  message: string
}

export type ApiResponsePayload<T = void> = SuccessResponse<T> | ErrorResponse

export type ApiResponse<T = void> = {
  status(code: number): ApiResponse<T>
  json(body: ApiResponsePayload<T>): void
  send(body: ApiResponsePayload<T>): void
}

/* ---
  EXPRESS MODULE AUGMENTATION
--- */

declare module 'express-serve-static-core' {
  interface Request {
    user: User
  }
}
