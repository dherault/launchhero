import firebase from 'firebase-admin'
import type { User } from 'launchhero-core'

async function readUsersById(userIds: string[]): Promise<User[]> {
  const snapshots = await firebase.firestore()
    .collection('users')
    .where('id', 'in', userIds)
    .get()

  return snapshots.docs.map(doc => doc.data() as User)
}

export default readUsersById
