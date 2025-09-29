import firebase from 'firebase-admin'
import type { User } from 'launchhero-core'

async function updateUser(userId: string, updatePayload: Partial<User>) {
  console.log('💽 Updating User', userId)

  await firebase.firestore()
    .collection('users')
    .doc(userId)
    .update({
      ...updatePayload,
      updatedAt: new Date().toISOString(),
    })
}

export default updateUser
