import firebase from 'firebase-admin'
import type { Project } from 'launchhero-core'

async function updateProject(projectId: string, updatePayload: Partial<Project>) {
  console.log('💽 Updating Project', projectId)

  await firebase.firestore()
    .collection('projects')
    .doc(projectId)
    .update({
      ...updatePayload,
      updatedAt: new Date().toISOString(),
    })
}

export default updateProject
