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
import { getPerformance } from 'firebase/performance'

/* ---
  Firebase app
--- */

const firebaseConfig = {
  apiKey: 'AIzaSyAPYBQP4nLIr9RI66ab9j5xzsxeKf6MUJ4',
  authDomain: 'submithero.firebaseapp.com',
  projectId: 'submithero',
  storageBucket: 'submithero.firebasestorage.app',
  messagingSenderId: '453105887895',
  appId: '1:453105887895:web:924cda16311856b08157d2',
  measurementId: 'G-T7WJXLYC8X',
}

if (import.meta.env.DEV) {
  // @ts-expect-error
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
}

const app = initializeApp(firebaseConfig)

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Ldo49YrAAAAAGWh5RrtfVK-PfayRpSvglRifFVY'),
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
}
