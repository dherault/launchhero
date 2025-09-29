import firebase from 'firebase-admin'
import type { QuerySnapshot } from 'firebase-admin/firestore'
import type { Project } from 'launchhero-core'

async function readUserProjects(userId: string) {
  const snapshot = await firebase.firestore()
    .collection('projects')
    .where('memberUserIds', 'array-contains', userId)
    .get() as QuerySnapshot<Project>

  return snapshot.docs.map(doc => doc.data()) ?? []
}

export default readUserProjects
