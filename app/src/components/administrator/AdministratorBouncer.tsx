import type { JSX, PropsWithChildren } from 'react'

import useUser from '~hooks/data/useUser'

import Loading from '~components/common/Loading'
import NotFound from '~components/common/NotFound'

function AdministratorBouncer({ children }: PropsWithChildren) {
  const { user, loading } = useUser()

  if (loading) {
    return (
      <Loading source="AdministratorBouncer" />
    )
  }

  if (!user?.isAdministrator) {
    return (
      <NotFound source="AdministratorBouncer" />
    )
  }

  return children as JSX.Element
}

export default AdministratorBouncer
