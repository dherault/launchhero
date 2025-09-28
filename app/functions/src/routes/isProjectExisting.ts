import { setGlobalOptions } from 'firebase-functions'
import { onCall } from 'firebase-functions/https'
import * as logger from 'firebase-functions/logger'

import { CALL_OPTIONS } from '~constants'

import readProjectById from '~database/readProjectById'

setGlobalOptions({ maxInstances: 12 })

const isProjectExisting = onCall(CALL_OPTIONS, async request => {
  const projectId = request.data?.projectId
  const project = await readProjectById(projectId)
  const exists = !!project

  logger.info('🏹 isProjectExisting', { projectId, exists })

  return exists
})

export default isProjectExisting
