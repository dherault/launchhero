import { getAnalytics, logEvent } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  setPersistence,
} from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions'
import { getPerformance } from 'firebase/performance'

/* ---
  Firebase app
--- */

const firebaseConfig = {
  apiKey: 'AIzaSyBjXKkpOTVh5Qyb_OnIg6csNyf8SDGiD6Q',
  authDomain: 'launchhe.ro',
  projectId: 'launch-hero',
  storageBucket: 'launch-hero.firebasestorage.app',
  messagingSenderId: '441826276681',
  appId: '1:441826276681:web:472fb23b7fdd7024a2d698',
  measurementId: 'G-94NQ4P60C6',
}

if (import.meta.env.DEV) {
  // @ts-expect-error
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
}

const app = initializeApp(firebaseConfig)

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lc109crAAAAAEknDmUJn0hJsahm9DoKVDgj80nI'),
  isTokenAutoRefreshEnabled: true,
})

/* ---
  Database
--- */

export const database = getFirestore(app)

/* ---
  Authentication
--- */

export const authentication = getAuth(app)

export const persistancePromise = setPersistence(authentication, browserLocalPersistence)

export const googleProvider = new GoogleAuthProvider()

/* ---
  Functions
--- */

export const functions = getFunctions(app)

export const invokeIsProjectExisting = httpsCallable<{ projectId: string }, boolean>(
  functions,
  'isProjectExisting',
)

/* ---
  Analytics
--- */

const analytics = getAnalytics(app)

export const logAnalytics = (eventName: string, eventParams?: Record<string, any>) => {
  if (!import.meta.env.PROD) return

  logEvent(analytics, eventName, eventParams)
}

/* ---
  Performance
--- */

if (import.meta.env.PROD) {
  getPerformance(app)
}

/* ---
  Emulators
--- */

if (import.meta.env.DEV) {
  console.log('💽 Using Firebase emulators')

  connectAuthEmulator(authentication, 'http://localhost:9099', { disableWarnings: true })
  connectFirestoreEmulator(database, 'localhost', 8080)
  connectFunctionsEmulator(functions, 'localhost', 5001)
}
