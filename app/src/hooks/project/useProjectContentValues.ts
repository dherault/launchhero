import type { DirectoryRequirementType } from 'launchhero-core'
import { useCallback, useMemo, useState } from 'react'

import useProject from '~hooks/data/useProject'
import useProjects from '~hooks/data/useProjects'

function useProjectContentValues(type: DirectoryRequirementType) {
  const project = useProject()
  const { updateProject } = useProjects()

  const values = useMemo(() => project?.contents.filter(content => content.type === type).map(content => content.value) ?? [], [project, type])

  const [loading, setLoading] = useState(false)

  const setValues = useCallback(async (nextValues: string[]) => {
    if (!project) return

    setLoading(true)

    const nextContents = [...project.contents].filter(content => content.type !== type)

    nextValues.forEach(value => {
      nextContents.push({ type, value })
    })

    await updateProject(project.id, { contents: nextContents })

    setLoading(false)
  }, [
    type,
    project,
    updateProject,
  ])

  return { values, setValues, loading }
}

export default useProjectContentValues
