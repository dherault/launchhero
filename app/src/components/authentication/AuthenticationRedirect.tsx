import { type JSX, type PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

import useUser from '~hooks/data/useUser'

function AuthenticationRedirect({ children }: PropsWithChildren) {
  const { user } = useUser()

  if (user) {
    return (
      <Navigate
        replace
        to="/-"
      />
    )
  }

  return children as JSX.Element
}

export default AuthenticationRedirect
