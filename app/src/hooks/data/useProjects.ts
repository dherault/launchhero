import { useContext } from 'react'

import ProjectsContext from '~contexts/data/ProjectsContext'

function useProjects() {
  return useContext(ProjectsContext)
}

export default useProjects
