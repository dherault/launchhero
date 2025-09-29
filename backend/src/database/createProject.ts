import firebase from 'firebase-admin'
import type { Project } from 'launchhero-core'

async function createProject(project: Project) {
  console.log('💽 Creating Project', project.id)

  await firebase.firestore()
    .collection('projects')
    .doc(project.id)
    .set(project)
}

export default createProject
