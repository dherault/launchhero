import type { Request, Response } from 'express'
import { ERROR_CODE_INTERNAL_ERROR } from 'launchhero-core'

function errorMiddleware(error: any, request: Request, response: Response) {
  console.error(`❌ ${request.path}:`, error)

  response.status(500).json({
    status: 'error',
    code: ERROR_CODE_INTERNAL_ERROR,
    error: 'Internal Server Error',
  })
}

export default errorMiddleware
