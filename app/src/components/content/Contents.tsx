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
import ContentRequirements from '~components/content/ContentRequirements'

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
    <div className="space-y-2">
      <ContentForm
        type="punchline"
        formSchema={punchlineFormSchema}
        inputType="input"
      />
      <ContentRequirements type="punchline" />
    </div>
  )
}

/* ---
  Description
--- */

const descriptionFormSchema = createStringSchema(z.string())

export function ContentDescription() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="description"
        formSchema={descriptionFormSchema}
        inputType="textarea"
      />
      <ContentRequirements type="description" />
    </div>
  )
}

/* ---
  Logo
--- */

export function ContentIcon() {
  const project = useProject()
  const { values, setValues } = useProjectContentValues('icon')
  const [error, setError] = useState<Error | null>(null)

  return (
    <div className="space-y-2">
      <ContentLabel type="icon" />
      <ImageUpload
        storagePath={`projects/${project?.id}/icons`}
        maxSizeMB={IMAGE_UPLOAD_MAX_SIZE_MB}
        currentImageUrls={values}
        onUploadComplete={setValues}
        onUploadError={setError}
      />
      <ContentError message={error?.message} />
      <ContentRequirements type="icon" />
    </div>
  )
}

/* ---
  Logo
--- */

export function ContentLogo() {
  const project = useProject()
  const { values, setValues } = useProjectContentValues('logo')
  const [error, setError] = useState<Error | null>(null)

  return (
    <div className="space-y-2">
      <ContentLabel type="logo" />
      <ImageUpload
        storagePath={`projects/${project?.id}/logos`}
        maxSizeMB={IMAGE_UPLOAD_MAX_SIZE_MB}
        currentImageUrls={values}
        onUploadComplete={setValues}
        onUploadError={setError}
      />
      <ContentError message={error?.message} />
      <ContentRequirements type="logo" />
    </div>
  )
}

/* ---
  Screenshot
--- */

export function ContentScreenshot() {
  const project = useProject()
  const { values, setValues } = useProjectContentValues('screenshot')
  const [error, setError] = useState<Error | null>(null)

  return (
    <div className="space-y-2">
      <ContentLabel type="screenshot" />
      <ImageUpload
        multiple
        storagePath={`projects/${project?.id}/screenshots`}
        maxSizeMB={IMAGE_UPLOAD_MAX_SIZE_MB}
        currentImageUrls={values}
        onUploadComplete={setValues}
        onUploadError={setError}
      />
      <ContentError message={error?.message} />
      <ContentRequirements type="screenshot" />
    </div>
  )
}

/* ---
  X (Twitter)
--- */

export function ContentX() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="x"
        formSchema={urlFormSchema}
        inputType="input"
      />
      <ContentRequirements type="x" />
    </div>
  )
}

/* ---
  Instagram
--- */

export function ContentInstagram() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="instagram"
        formSchema={urlFormSchema}
        inputType="input"
      />
      <ContentRequirements type="instagram" />
    </div>
  )
}

/* ---
  LinkedIn
--- */

export function ContentLinkedin() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="linkedin"
        formSchema={urlFormSchema}
        inputType="input"
      />
      <ContentRequirements type="linkedin" />
    </div>
  )
}

/* ---
  Facebook
--- */

export function ContentFacebook() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="facebook"
        formSchema={urlFormSchema}
        inputType="input"
      />
      <ContentRequirements type="facebook" />
    </div>
  )
}

/* ---
  GitHub
--- */

export function ContentGithub() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="github"
        formSchema={urlFormSchema}
        inputType="input"
      />
      <ContentRequirements type="github" />
    </div>
  )
}

/* ---
  Dribbble
--- */

export function ContentDribbble() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="dribbble"
        formSchema={urlFormSchema}
        inputType="input"
      />
      <ContentRequirements type="dribbble" />
    </div>
  )
}

/* ---
  YouTube
--- */

export function ContentYoutube() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="youtube"
        formSchema={urlFormSchema}
        inputType="input"
      />
      <ContentRequirements type="youtube" />
    </div>
  )
}

/* ---
  Portfolio
--- */

export function ContentPortfolio() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="portfolio"
        formSchema={urlFormSchema}
        inputType="input"
      />
      <ContentRequirements type="portfolio" />
    </div>
  )
}

/* ---
  Country
--- */

const countryFormSchema = createStringSchema(z.string())

export function ContentCountry() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="country"
        formSchema={countryFormSchema}
        inputType="input"
      />
      <ContentRequirements type="country" />
    </div>
  )
}

/* ---
  Video
--- */

export function ContentVideo() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="video"
        formSchema={urlFormSchema}
        inputType="input"
      />
      <ContentRequirements type="video" />
    </div>
  )
}

/* ---
  Tags
--- */

const tagsFormSchema = createStringSchema(z.string())

export function ContentTags() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="tag"
        formSchema={tagsFormSchema}
        inputType="input"
      />
      <ContentRequirements type="tag" />
    </div>
  )
}

/* ---
  Business Model
--- */

const businessModelFormSchema = createStringSchema(z.string())

export function ContentBusinessModel() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="business-model"
        formSchema={businessModelFormSchema}
        inputType="input"
      />
      <ContentRequirements type="business-model" />
    </div>
  )
}

/* ---
  Interactive Demo
--- */

export function ContentInteractiveDemo() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="demo"
        formSchema={urlFormSchema}
        inputType="input"
      />
      <ContentRequirements type="demo" />
    </div>
  )
}

/* ---
  First Comment
--- */

const firstCommentFormSchema = createStringSchema(z.string())

export function ContentFirstComment() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="first-comment"
        formSchema={firstCommentFormSchema}
        inputType="textarea"
      />
      <ContentRequirements type="first-comment" />
    </div>
  )
}

/* ---
  Product Shoutouts
--- */

const productShoutoutsFormSchema = createStringSchema(z.string())

export function ContentProductShoutouts() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="product-shoutout"
        formSchema={productShoutoutsFormSchema}
        inputType="textarea"
      />
      <ContentRequirements type="product-shoutout" />
    </div>
  )
}

/* ---
  Team Emails
--- */

const teamEmailsFormSchema = createStringSchema(z.string())

export function ContentTeamEmails() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="team-email"
        formSchema={teamEmailsFormSchema}
        inputType="input"
      />
      <ContentRequirements type="team-email" />
    </div>
  )
}

/* ---
  Is Maker
--- */

const isMakerFormSchema = createStringSchema(z.string())

export function ContentIsMaker() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="is-maker"
        formSchema={isMakerFormSchema}
        inputType="input"
      />
      <ContentRequirements type="is-maker" />
    </div>
  )
}

/* ---
  Launch Date
--- */

const launchDateFormSchema = createStringSchema(z.string())

export function ContentLaunchDate() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="launch-date"
        formSchema={launchDateFormSchema}
        inputType="input"
      />
      <ContentRequirements type="launch-date" />
    </div>
  )
}

/* ---
  Funding
--- */

const fundingFormSchema = createStringSchema(z.string())

export function ContentFunding() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="funding"
        formSchema={fundingFormSchema}
        inputType="input"
      />
      <ContentRequirements type="funding" />
    </div>
  )
}

/* ---
  Promo Code
--- */

const promoCodeFormSchema = createStringSchema(z.string())

export function ContentPromoCode() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="promo-code"
        formSchema={promoCodeFormSchema}
        inputType="input"
      />
      <ContentRequirements type="promo-code" />
    </div>
  )
}

/* ---
  Platform
--- */

const platformFormSchema = createStringSchema(z.string())

export function ContentPlatform() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="platform"
        formSchema={platformFormSchema}
        inputType="input"
      />
      <ContentRequirements type="platform" />
    </div>
  )
}

/* ---
  Production Status
--- */

const productionStatusFormSchema = createStringSchema(z.string())

export function ContentProductionStatus() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="production-status"
        formSchema={productionStatusFormSchema}
        inputType="input"
      />
      <ContentRequirements type="production-status" />
    </div>
  )
}

/* ---
  Market
--- */

const marketFormSchema = createStringSchema(z.string())

export function ContentMarket() {
  return (
    <div className="space-y-2">
      <ContentForm
        type="market"
        formSchema={marketFormSchema}
        inputType="input"
      />
      <ContentRequirements type="market" />
    </div>
  )
}
