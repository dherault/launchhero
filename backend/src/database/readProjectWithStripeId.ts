import firebase from 'firebase-admin'
import type { Project } from 'launchhero-core'

async function readProjectsWithStripeId(): Promise<Project[]> {
  const snapshot = await firebase.firestore()
    .collection('projects')
    .get()

  return snapshot.docs
    .map(doc => doc.data() as Project)
    .filter(project => project.stripeId)
}

export default readProjectsWithStripeId
