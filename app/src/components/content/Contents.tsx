import { useCallback, useState } from 'react'
import z from 'zod'

import useProject from '~hooks/data/useProject'
import useProjects from '~hooks/data/useProjects'
import useProjectContentValues from '~hooks/project/useProjectContentValues'

import { ImageUpload } from '~components/common/ImageUpload'
import { IMAGE_UPLOAD_MAX_SIZE_MB } from '~components/content/constants'
import ContentError from '~components/content/ContentError'
import ContentForm from '~components/content/ContentForm'
import ContentLabel from '~components/content/ContentLabel'

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

/* ---
  Description
--- */

const descriptionFormSchema = createStringSchema(z.string())

export function ContentDescription() {
  return (
    <ContentForm
      type="description"
      formSchema={descriptionFormSchema}
      inputType="textarea"
    />
  )
}

/* ---
  Logo
--- */

export function ContentIcon() {
  const project = useProject()
  const { values, setValues } = useProjectContentValues('icon')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      <ContentLabel type="icon" />
      <ImageUpload
        storagePath={`projects/${project?.id}/icons`}
        maxSizeMB={IMAGE_UPLOAD_MAX_SIZE_MB}
        currentImageUrls={values}
        onUploadComplete={urls => setValues(urls)}
        onUploadError={err => setError(err?.message ?? null)}
      />
      <ContentError message={error} />
    </div>
  )
}

/* ---
  Logo
--- */

export function ContentLogo() {
  const project = useProject()
  const { values, setValues } = useProjectContentValues('logo')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      <ContentLabel type="logo" />
      <ImageUpload
        storagePath={`projects/${project?.id}/logos`}
        maxSizeMB={IMAGE_UPLOAD_MAX_SIZE_MB}
        currentImageUrls={values}
        onUploadComplete={urls => setValues(urls)}
        onUploadError={err => setError(err?.message ?? null)}
      />
      <ContentError message={error} />
    </div>
  )
}

/* ---
  Screenshot
--- */

export function ContentScreenshot() {
  const project = useProject()
  const { values, setValues } = useProjectContentValues('screenshot')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      <ContentLabel type="screenshot" />
      <ImageUpload
        multiple
        storagePath={`projects/${project?.id}/screenshots`}
        maxSizeMB={IMAGE_UPLOAD_MAX_SIZE_MB}
        currentImageUrls={values}
        onUploadComplete={urls => setValues(urls)}
        onUploadError={err => setError(err?.message ?? null)}
      />
      <ContentError message={error} />
    </div>
  )
}

/* ---
  Country
--- */

const countryFormSchema = createStringSchema(z.string())

export function ContentCountry() {
  return (
    <ContentForm
      type="country"
      formSchema={countryFormSchema}
      inputType="input"
    />
  )
}
