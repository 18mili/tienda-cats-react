// Firebase initialization (v9 modular)
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBeh9lqDk0i1JSd0tvb1ZOkzh2hyAptfiY",
  authDomain: "tiendacats-database.firebaseapp.com",
  projectId: "tiendacats-database",
  storageBucket: "tiendacats-database.firebasestorage.app",
  messagingSenderId: "786498085788",
  appId: "1:786498085788:web:5c36e494d3d62197889e59"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
