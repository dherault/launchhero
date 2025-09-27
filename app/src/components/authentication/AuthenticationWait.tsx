import { type JSX, type PropsWithChildren } from 'react'

import useUser from '~hooks/data/useUser'

import Loading from '~components/common/Loading'

function AuthenticationWait({ children }: PropsWithChildren) {
  const { loading } = useUser()

  if (loading) {
    return (
      <Loading source="AuthenticationWait" />
    )
  }

  return children as JSX.Element
}

export default AuthenticationWait
