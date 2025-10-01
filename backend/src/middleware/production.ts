import type { NextFunction, Request } from 'express'
import { ERROR_CODE_INTERNAL_ERROR } from 'launchhero-core'

import type { ApiResponse } from '~types'

import { IS_PRODUCTION } from '~constants'

function productionMiddleware(_request: Request, response: ApiResponse, next: NextFunction) {
  if (!IS_PRODUCTION) {
    console.warn('⚠️ Not in production mode')

    response.status(400).json({
      status: 'error',
      code: ERROR_CODE_INTERNAL_ERROR,
      message: 'Not running in production mode',
    })

    return
  }

  next()
}

export default productionMiddleware
