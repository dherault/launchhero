import firebase from 'firebase-admin'
import type { ProjectInvitation } from 'launchhero-core'

async function createProjectInvitation(projectInvitation: ProjectInvitation) {
  console.log('💽 Creating ProjectInvitation', projectInvitation.id)

  await firebase.firestore()
    .collection('projectInvitations')
    .doc(projectInvitation.id)
    .set(projectInvitation)
}

export default createProjectInvitation
