import type { NextFunction, Request, Response } from 'express'
import express from 'express'

import { NO_JSON_PARSING_ROUTES } from '~constants'

function jsonMiddleware(request: Request, response: Response, next: NextFunction) {
  if (NO_JSON_PARSING_ROUTES.includes(request.originalUrl)) {
    express.raw({ type: 'application/json' })(request, response, next)

    return
  }

  express.json()(request, response, next)
}

export default jsonMiddleware
