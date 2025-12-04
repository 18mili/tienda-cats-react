import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const register = async ({ nombre, email, pass }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass)
    // crear documento de usuario en Firestore
    await setDoc(doc(db, 'users', cred.user.uid), {
      nombre,
      email,
      isAdmin: false
    })
    // actualizar estado local
    setUser({ uid: cred.user.uid, email })
    setIsAdmin(false)
    return { user: cred.user }
  }

  const login = async (email, pass) => {
    const cred = await signInWithEmailAndPassword(auth, email, pass)
    // leer doc de usuario para atributos (isAdmin, nombre...)
    try {
      const docu = await getDoc(doc(db, 'users', cred.user.uid))
      const data = docu.exists() ? docu.data() : null
      setUser({ uid: cred.user.uid, email: cred.user.email, nombre: data?.nombre || null })
      setIsAdmin(!!(data && data.isAdmin))
      return { isAdmin: !!(data && data.isAdmin) }
    } catch (e) {
      setUser({ uid: cred.user.uid, email: cred.user.email })
      setIsAdmin(false)
      return { isAdmin: false }
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setIsAdmin(false)
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        // intenta leer doc de usuario
        try {
          const docu = await getDoc(doc(db, 'users', u.uid))
          const data = docu.exists() ? docu.data() : null
          setUser({ uid: u.uid, email: u.email, nombre: data?.nombre || null })
          setIsAdmin(!!(data && data.isAdmin))
        } catch (e) {
          setUser({ uid: u.uid, email: u.email })
          setIsAdmin(false)
        }
      } else {
        setUser(null)
        setIsAdmin(false)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
