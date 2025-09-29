import firebase from 'firebase-admin'
import type { ProjectInvitation } from 'launchhero-core'

async function readProjectInvitation(projectInvitationId: string): Promise<ProjectInvitation | null> {
  const snapshot = await firebase.firestore()
    .collection('projectInvitations')
    .doc(projectInvitationId)
    .get()

  return snapshot.data() as ProjectInvitation ?? null
}

export default readProjectInvitation
