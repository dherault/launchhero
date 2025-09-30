import path from 'node:path'

import 'dotenv/config'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import { APP_URL, DEVELOPMENT_BACKEND_PORT } from 'launchhero-core'

import { IS_DEVELOPMENT, IS_PRODUCTION } from '~constants'

import capitalize from '~utils/capitalize'

import createEmailsRouter from '~routes/emails'
import createProjectsRoutes from '~routes/projects'

import authenticationMiddleware from '~middleware/authentication'
import errorMiddleware from '~middleware/error'
import jsonMiddleware from '~middleware/json'
import loggerMiddleware from '~middleware/logger'

import packageJson from '../package.json' with { type: 'json' }

import initializeFirebase from './firebase'

if (IS_DEVELOPMENT) {
  config({
    path: path.resolve(import.meta.dirname, '../.env.development'),
    override: true,
    quiet: true,
  })
}

async function serve() {
  await initializeFirebase()

  const app = express()
  const PORT = process.env.PORT || DEVELOPMENT_BACKEND_PORT

  app.use(cors({
    origin: IS_PRODUCTION ? APP_URL : '*',
  }))

  app.use(jsonMiddleware)
  app.use(loggerMiddleware)
  app.use(authenticationMiddleware)

  app.get('/', (_request, response) => {
    response.json({ version: packageJson.version })
  })

  app.use('/projects', createProjectsRoutes())
  app.use('/emails', createEmailsRouter())
  // app.use('/stripe', createStripeRoutes())

  app.use(errorMiddleware)

  app.listen(PORT, () => {
    console.log(`🦄 ${capitalize(process.env.NODE_ENV || 'unknown')} environment`)
    console.log(`🚀 Running server at http://localhost:${PORT}`)
  })
}

serve()
