import type { NextFunction, Request } from 'express'
import firebase from 'firebase-admin'
import {
  ERROR_CODE_INVALID_BEARER_TOKEN,
  ERROR_CODE_NO_BEARER_TOKEN,
  ERROR_CODE_USER_NOT_FOUND,
} from 'launchhero-core'

import type { ApiResponse } from '~types'

import { NO_AUTHENTICATION_ROUTES } from '~constants'

import readUser from '~database/readUser'

async function authenticationMiddleware(request: Request, response: ApiResponse, next: NextFunction) {
  if (NO_AUTHENTICATION_ROUTES.includes(request.path)) {
    next()

    return
  }

  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('❌ Authentication: No token provided')

    response.status(401).json({
      status: 'error',
      code: ERROR_CODE_NO_BEARER_TOKEN,
      message: 'Unauthorized: No token provided',
    })

    return
  }

  let decodedTokenUserId: string | null = null

  try {
    const idToken = authHeader.split(' ')[1]
    const decodedToken = await firebase.auth().verifyIdToken(idToken)

    decodedTokenUserId = decodedToken.uid
  }
  catch (error) {
    console.error('❌ Authentication: Cannot verify token')
    console.error(error)

    response.status(401).json({
      status: 'error',
      code: ERROR_CODE_INVALID_BEARER_TOKEN,
      message: 'Unauthorized: Invalid token',
    })
  }

  const user = await readUser(decodedTokenUserId!)

  if (!user) {
    console.error('❌ Authentication: User not found')

    response.status(404).json({
      status: 'error',
      code: ERROR_CODE_USER_NOT_FOUND,
      message: 'User not found',
    })

    return
  }

  request.user = user

  console.log('🧍', request.user.email)

  next()
}

export default authenticationMiddleware
