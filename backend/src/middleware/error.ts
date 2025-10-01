import type { Request } from 'express'
import { ERROR_CODE_INTERNAL_ERROR } from 'launchhero-core'

import type { ApiResponse } from '~types'

function errorMiddleware(error: any, request: Request, response: ApiResponse) {
  console.error(`❌ ${request.path}:`, error)

  response.status(500).json({
    status: 'error',
    code: ERROR_CODE_INTERNAL_ERROR,
    message: 'Internal Server Error',
  })
}

export default errorMiddleware
