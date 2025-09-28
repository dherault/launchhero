import {
  type User as Viewer,
  onAuthStateChanged,
  signOut as authenticationSignOut,
  sendEmailVerification,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  type UpdateData,
} from 'firebase/firestore'
import type { SignInProvider, User } from 'launchhero-core'
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigate } from 'react-router'

import { NULL_DOCUMENT_ID } from '~constants'

import {
  authentication,
  database,
  logAnalytics,
  persistancePromise,
} from '~firebase'

import UserContext, { type UserContextType } from '~contexts/data/UserContext'

import useLiveDocument from '~hooks/db/useLiveDocument'

import getTimeZone from '~utils/common/getTimeZone'

import ErrorOccured from '~components/common/ErrorOccured'

function AuthenticationProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate()

  const [viewer, setViewer] = useState<Viewer | null>(null)
  const [loadingAuthentication, setLoadingAuthentication] = useState(true)

  const userId = viewer?.uid
  const userDocument = useMemo(() => doc(database, 'users', userId ?? NULL_DOCUMENT_ID), [userId])

  const { data: user, error: userError, loading: loadingUser } = useLiveDocument<User>(userDocument, !!userId)
  // useLiveDocument's loading has a delay
  // between the data fetching and the loading state
  // being set to false so we use this instead
  const loadingUserFinal = !!userId && !user
  const hasUser = !!(userId && user)

  const handleAuthenticationStateChange = useCallback(async () => {
    await persistancePromise

    onAuthStateChanged(authentication, async viewer => {
      setViewer(viewer)
      setLoadingAuthentication(false)

      if (viewer) logAnalytics('signin')
    })
  }, [])

  const createUser = useCallback(async () => {
    if (!viewer) return
    if (loadingUser || user) return

    const existingUser = await getDoc(userDocument)

    if (existingUser.exists()) return

    const signInProvider = viewer.providerData[0].providerId as SignInProvider

    try {
      const now = new Date().toISOString()
      const createdUser: User = {
        id: viewer.uid,
        userId: viewer.uid,
        email: viewer.email ?? '',
        name: viewer.displayName ?? '',
        imageUrl: viewer.photoURL ?? '',
        signInProviders: [signInProvider],
        timeZone: getTimeZone(),
        hasVerifiedEmail: false,
        hasSentVerificationEmail: false,
        hasSentWelcomeEmail: false,
        isAdministrator: false,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      }

      await setDoc(userDocument, createdUser)

      logAnalytics('signup', {
        method: signInProvider,
      })
    }
    catch (error) {
      console.error('Error creating user')
      console.error(error)
    }
  }, [
    viewer,
    user,
    loadingUser,
    userDocument,
  ])

  const updateUser = useCallback(async (payload: UpdateData<User>) => {
    if (!hasUser) return

    console.groupCollapsed('--> Updating user')
    console.log(payload)
    console.groupEnd()

    await updateDoc(userDocument, {
      ...payload,
      updatedAt: new Date().toISOString(),
    })
  }, [
    hasUser,
    userDocument,
  ])

  const updateUserData = useCallback(async () => {
    if (!(viewer && user)) return

    const updatedUser: UpdateData<User> = {}
    const signInProviders = viewer.providerData.map(x => x.providerId as SignInProvider).sort()
    const timeZone = getTimeZone()

    if (viewer.email && viewer.email !== user.email) updatedUser.email = viewer.email
    if (viewer.emailVerified !== user.hasVerifiedEmail) updatedUser.hasVerifiedEmail = viewer.emailVerified
    if (user.signInProviders.length !== signInProviders.length || user.signInProviders.some((x, i) => x !== signInProviders[i])) updatedUser.signInProviders = signInProviders
    if (timeZone !== user.timeZone) updatedUser.timeZone = timeZone

    if (!Object.entries(updatedUser).length) return

    await updateUser(updatedUser)
  }, [
    viewer,
    user,
    updateUser,
  ])

  const handleFirstTimeUser = useCallback(async () => {
    if (!(viewer && user)) return

    if (!user.hasSentVerificationEmail && import.meta.env.PROD && user.signInProviders.includes('password')) {
      sendEmailVerification(viewer)

      await updateUser({
        hasSentVerificationEmail: true,
      })
    }
  }, [
    viewer,
    user,
    updateUser,
  ])

  const signOut = useCallback(async () => {
    setViewer(null)

    await authenticationSignOut(authentication)

    logAnalytics('signout')
    navigate('/')
  }, [
    navigate,
  ])

  // Listen for auth change
  useEffect(() => {
    handleAuthenticationStateChange()
  }, [
    handleAuthenticationStateChange,
  ])

  // Create user on first sign in
  useEffect(() => {
    createUser()
  }, [
    createUser,
  ])

  // Handle first-time user
  useEffect(() => {
    handleFirstTimeUser()
  }, [
    handleFirstTimeUser,
  ])

  // Update sign in providers and other user data
  useEffect(() => {
    updateUserData()
  }, [
    updateUserData,
  ])

  const userContextValue = useMemo<UserContextType>(() => ({
    viewer,
    user,
    loading: loadingAuthentication || loadingUserFinal,
    updateUser,
    signOut,
  }), [
    viewer,
    user,
    loadingAuthentication,
    loadingUserFinal,
    updateUser,
    signOut,
  ])

  if (userError) {
    return (
      <ErrorOccured
        source="AuthenticationProvider"
        message={userError.message}
      />
    )
  }

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default AuthenticationProvider
