import firebase from 'firebase-admin'
import type { User } from 'launchhero-core'

async function readUser(userId: string): Promise<User | null> {
  const snapshot = await firebase.firestore()
    .collection('users')
    .doc(userId)
    .get()

  return (snapshot.data() as User) ?? null
}

export default readUser
