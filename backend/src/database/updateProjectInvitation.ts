import firebase from 'firebase-admin'
import type { ProjectInvitation } from 'launchhero-core'

async function updateProjectInvitation(projectInvitationId: string, updatePayload: Partial<ProjectInvitation>) {
  console.log('💽 Updating ProjectInvitation', projectInvitationId)

  await firebase.firestore()
    .collection('projectInvitations')
    .doc(projectInvitationId)
    .update({
      ...updatePayload,
      updatedAt: new Date().toISOString(),
    })
}

export default updateProjectInvitation
