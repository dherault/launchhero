import firebase from 'firebase-admin'

import { SECRET_FIREBASE_SERVICE_ACCOUNT_KEY } from '~constants'

import retrieveSecret from '~utils/retrieveSecret'

async function initializeFirebase(name?: string) {
  const certificate = await retrieveSecret(SECRET_FIREBASE_SERVICE_ACCOUNT_KEY)

  const app = firebase.initializeApp({
    credential: firebase.credential.cert(JSON.parse(certificate)),
  }, name)

  console.log(`📀 Firebase initialized${name ? `: ${name}` : ''}`)

  return app
}

export default initializeFirebase
