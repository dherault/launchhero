import type { NextFunction, Request } from 'express'

import type { ApiResponse } from '~types'

function loggerMiddleware(request: Request, _response: ApiResponse, next: NextFunction) {
  console.log(`🏹 ${request.method} ${request.url}`)

  next()
}

export default loggerMiddleware
