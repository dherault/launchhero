import { useEffect } from 'react'

import useUser from '~hooks/data/useUser'

import Loading from '~components/common/Loading'

function SignOut() {
  const { signOut } = useUser()

  useEffect(() => {
    signOut()
  }, [
    signOut,
  ])

  return (
    <Loading source="SignOut" />
  )
}

export default SignOut
