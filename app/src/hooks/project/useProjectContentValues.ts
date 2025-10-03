import type { DirectoryRequirementType } from 'launchhero-core'
import { SetStateAction, useCallback, useMemo, useState, type Dispatch } from 'react'

import useProject from '~hooks/data/useProject'
import useProjects from '~hooks/data/useProjects'

function useProjectContentValues(type: DirectoryRequirementType) {
  const project = useProject()
  const { updateProject } = useProjects()

  const values = useMemo(() => project?.contents.filter(content => content.type === type).map(content => content.value) ?? [], [project, type])

  const [loading, setLoading] = useState(false)

  const setValues = useCallback<Dispatch<SetStateAction<string[]>>>(async nextValues => {
    if (!project) return

    setLoading(true)

    const nextContents = [...project.contents].filter(content => content.type !== type)

    ;(typeof nextValues === 'function' ? nextValues(values) : nextValues).forEach(value => {
      nextContents.push({ type, value })
    })

    await updateProject(project.id, { contents: nextContents })

    setLoading(false)
  }, [
    type,
    project,
    values,
    updateProject,
  ])

  return { values, setValues, loading }
}

export default useProjectContentValues
