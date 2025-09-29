import firebase from 'firebase-admin'
import type { Project } from 'launchhero-core'

async function readProject(projectId: string): Promise<Project | null> {
  const snapshot = await firebase.firestore()
    .collection('projects')
    .doc(projectId)
    .get()

  return (snapshot.data() as Project) ?? null
}

export default readProject
