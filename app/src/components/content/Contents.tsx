import z from 'zod'

import ContentForm from '~components/content/ContentForm'

function createStringSchema(zodType: z.ZodTypeAny, message: string) {
  return z.object({
    value: z
      .string()
      .trim()
      .refine(val => val === '' || zodType.safeParse(val).success, { message }),
  })
}

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
