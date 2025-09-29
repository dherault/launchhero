import type { NextFunction, Request, Response } from 'express'
import {
  ERROR_CODE_INVALID_BEARER_TOKEN,
  ERROR_CODE_NO_BEARER_TOKEN,
} from 'launchhero-core'

import retrieveSecret from '~utils/retrieveSecret'

function createAuthenticationWithSecretMiddleware(secretKey: string) {
  return async function authenticationWithSecretMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('❌ Emails: No token')

      response.status(401).json({
        status: 'error',
        code: ERROR_CODE_NO_BEARER_TOKEN,
        message: 'Unauthorized: No token provided',
      })

      return
    }

    const token = authHeader.split(' ')[1]

    const secret = await retrieveSecret(secretKey)

    if (token !== secret) {
      console.error('❌ Emails: Invalid token')

      response.status(403).json({
        status: 'error',
        code: ERROR_CODE_INVALID_BEARER_TOKEN,
        message: 'Forbidden: Invalid token',
      })

      return
    }
    next()
  }
}

export default createAuthenticationWithSecretMiddleware
