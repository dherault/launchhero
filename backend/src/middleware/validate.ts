import type { NextFunction, Request, Response } from 'express'
import type { z } from 'zod'

type ValidateOptions = {
  query?: z.ZodSchema
  body?: z.ZodSchema
}

function validate({ query: querySchema, body: bodySchema }: ValidateOptions) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      if (querySchema) querySchema.parse(request.query)
      if (bodySchema) bodySchema.parse(request.body)

      next()
    }
    catch (error: any) {
      console.error('❌ Validation error', error.message)

      response.status(400).json({
        status: 'error',
        error: error.message ?? 'Request validation failed',
      })
    }
  }
}

export default validate
