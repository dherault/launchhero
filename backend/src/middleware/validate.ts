import type { NextFunction, Request } from 'express'
import { ERROR_CODE_BAD_REQUEST } from 'launchhero-core'
import type { z } from 'zod'

import type { ApiResponse } from '~types'

type ValidateOptions = {
  query?: z.ZodSchema
  body?: z.ZodSchema
}

function validate({ query: querySchema, body: bodySchema }: ValidateOptions) {
  return (request: Request, response: ApiResponse<any>, next: NextFunction) => {
    try {
      if (querySchema) querySchema.parse(request.query)
      if (bodySchema) bodySchema.parse(request.body)

      next()
    }
    catch (error: any) {
      console.error('❌ Validation error', error.message)

      response.status(400).json({
        status: 'error',
        code: ERROR_CODE_BAD_REQUEST,
        message: error.message ?? 'Request validation failed',
      })
    }
  }
}

export default validate
