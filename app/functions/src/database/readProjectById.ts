import type { DocumentSnapshot } from 'firebase-admin/firestore'
import type { Project } from 'launchhero-core'

import { database } from '~firebase'

async function readProjectById(projectId: string) {
  const snapshot = await database.collection('projects').doc(projectId).get() as DocumentSnapshot<Project>

  return snapshot.data() ?? null
}

export default readProjectById
