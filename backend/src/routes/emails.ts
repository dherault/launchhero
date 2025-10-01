import { Router } from 'express'
import { ERROR_CODE_PROJECT_NOT_FOUND } from 'launchhero-core'
import getEmailContent from 'launchhero-email'

import type { ApiResponsePayload } from '~types'

import { EMAIL_FROM, IS_PRODUCTION, SECRET_EMAILS_API_SECRET } from '~constants'

import createAuthenticationWithSecretMiddleware from '~middleware/authenticationWithSecret'
import productionMiddleware from '~middleware/production'

import readUserProjects from '~database/readUserProjects'
import updateUser from '~database/updateUser'

import getResendClient from '~domain/emails/getResendClient'

function createEmailsRoutes() {
  const router = Router()

  /* ---
    HOURLY CRON JOB
  --- */

  router.post<any, ApiResponsePayload>(
    '/hourly-cron-job',
    productionMiddleware,
    createAuthenticationWithSecretMiddleware(SECRET_EMAILS_API_SECRET),
    async (_request, response) => {
      console.log('💌 Running hourly cron job')

      response.status(200).json({
        status: 'success',
      })
    },
  )

  /* ---
    WELCOME
  --- */

  router.post<any, ApiResponsePayload>(
    '/welcome',
    async (request, response) => {
      if (request.user.hasSentWelcomeEmail) {
        response.status(200).json({
          status: 'success',
        })

        return
      }

      await updateUser(request.user.id, { hasSentWelcomeEmail: true })

      if (IS_PRODUCTION) {
        const projects = await readUserProjects(request.user.id)

        if (projects.length === 0) {
          response.status(404).json({
            status: 'error',
            code: ERROR_CODE_PROJECT_NOT_FOUND,
            message: 'Project not found',
          })

          return
        }

        const resend = await getResendClient()
        const { subject, text, html } = await getEmailContent('welcome', { project: projects[0] })

        console.log('💌 Sending welcome email to', request.user.email)

        resend.emails.send({
          from: EMAIL_FROM,
          to: request.user.email,
          subject,
          html,
          text,
        })
      }

      response.status(201).json({
        status: 'success',
      })
    },
  )

  return router
}

export default createEmailsRoutes
