import firebase from 'firebase-admin'
import type { ProjectInvitation } from 'launchhero-core'

async function readProjectInvitations(projectId: string): Promise<ProjectInvitation[]> {
  const snapshot = await firebase.firestore()
    .collection('projectInvitations')
    .where('projectId', '==', projectId)
    .where('deletedAt', '==', null)
    .get()

  return snapshot.docs.map(doc => doc.data() as ProjectInvitation)
}

export default readProjectInvitations
