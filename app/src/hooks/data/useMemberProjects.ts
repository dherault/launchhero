import { useMemo } from 'react'

import useProjects from '~hooks/data/useProjects'
import useUser from '~hooks/data/useUser'

function useMemberProjects() {
  const { user } = useUser()
  const { projects } = useProjects()

  return useMemo(() => user ? projects.filter(project => project.memberUserIds.includes(user.id)) : [], [projects, user])
}

export default useMemberProjects
