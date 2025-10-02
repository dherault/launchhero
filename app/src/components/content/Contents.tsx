import { useCallback } from 'react'
import z from 'zod'

import useProject from '~hooks/data/useProject'
import useProjects from '~hooks/data/useProjects'

import ContentForm from '~components/content/ContentForm'

function createStringSchema(zodType: z.ZodTypeAny, message?: string) {
  return z.object({
    value: z
      .string()
      .trim()
      .refine(val => val === '' || zodType.safeParse(val).success, { message }),
  })
}

/* ---
  URL
--- */

const urlFormSchema = createStringSchema(z.url(), 'Must be a valid URL or empty')

export function ContentUrl() {
  return (
    <ContentForm
      type="url"
      formSchema={urlFormSchema}
      inputType="input"
    />
  )
}

/* ---
  Name
--- */

// Name is a required field
const nameFormSchema = z.object({
  value: z
    .string()
    .min(1, 'Name is required')
    .trim(),
})

export function ContentName() {
  const project = useProject()
  const { updateProject } = useProjects()

  const handleSave = useCallback((name: string) => {
    if (!project?.id) return

    updateProject(project?.id, { name })
  }, [
    project?.id,
    updateProject,
  ])

  return (
    <ContentForm
      type="name"
      formSchema={nameFormSchema}
      inputType="input"
      onSave={handleSave}
    />
  )
}

/* ---
  Punchline
--- */

const punchlineFormSchema = createStringSchema(z.string())

export function ContentPunchline() {
  return (
    <ContentForm
      type="punchline"
      formSchema={punchlineFormSchema}
      inputType="input"
    />
  )
}
