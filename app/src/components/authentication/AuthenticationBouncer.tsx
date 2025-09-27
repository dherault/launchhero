import { type JSX, type PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

import useUser from '~hooks/data/useUser'

function AuthenticationBouncer({ children }: PropsWithChildren) {
  const { viewer, user } = useUser()

  if (!(viewer && user)) {
    return (
      <Navigate
        replace
        to="/authentication"
      />
    )
  }

  return children as JSX.Element
}

export default AuthenticationBouncer
