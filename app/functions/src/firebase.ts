import { initializeApp } from 'firebase-admin/app'
import { initializeFirestore } from 'firebase-admin/firestore'

export const app = initializeApp()

export const database = initializeFirestore(app)
