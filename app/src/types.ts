/* ---
  API
--- */

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type ApiInput = {
  query?: Record<string, string>
  body?: any
}

export type QueryApiInput<T extends Record<string, string>> = {
  query: T
}

export type BodyApiInput<T> = {
  body: T
}

export type EmptyApiInput = {
  query?: undefined
  body?: undefined
}

type ApiResponseSuccess = {
  status: 'success'
  data: any
}

type ApiResponseError = {
  status: 'error'
  code: string
  message: string
}

export type ApiResponse = ApiResponseSuccess | ApiResponseError

export class ApiError extends Error {
  code: string

  constructor(code: string, message: string) {
    super(message)

    this.name = 'ApiError'
    this.code = code
  }
}

/* ---
  Directory
--- */

export type SubmissionStatus = 'all' | 'submitted' | 'unsubmitted'
