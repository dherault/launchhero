import { collection, orderBy, query } from 'firebase/firestore'
import { type PropsWithChildren, useMemo } from 'react'

import type { User } from '~types'

import { database } from '~firebase'

import UsersContext from '~contexts/data/UsersContext'

import useLiveDocuments from '~hooks/db/useLiveDocuments'

import ErrorOccured from '~components/common/ErrorOccured'
import Loading from '~components/common/Loading'

function AdministratorUsersProvider({ children }: PropsWithChildren) {
  const q = useMemo(() => query(
    collection(database, 'users'),
    orderBy('createdAt', 'desc'),
  ), [])

  const { data: users, loading, error } = useLiveDocuments<User>(q)

  if (error) {
    return (
      <ErrorOccured
        source="AdministratorUsersProvider"
        message={error.message}
      />
    )
  }

  if (loading) {
    return (
      <Loading source="AdministratorUsersProvider" />
    )
  }

  return (
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>
  )
}

export default AdministratorUsersProvider
