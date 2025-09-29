import firebase from 'firebase-admin'
import type { Project } from 'launchhero-core'

async function readProjectByStripeId(stripeId: string): Promise<Project | null> {
  const snapshot = await firebase.firestore()
    .collection('projects')
    .where('stripeId', '==', stripeId)
    .limit(1)
    .get()

  return (snapshot.docs[0]?.data() as Project) ?? null
}

export default readProjectByStripeId
