import { zodResolver } from '@hookform/resolvers/zod'
import type { DirectoryRequirementType } from 'launchhero-core'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import useProjectContentValue from '~hooks/project/useProjectContentValue'

import TextareaAutosize from '~components/common/TextareaAutosize'
import labels, { descriptions, placeholders } from '~components/content/constants'
import { Button } from '~components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~components/ui/Form'
import { Input } from '~components/ui/Input'

type Props = {
  type: DirectoryRequirementType
  formSchema: z.ZodSchema<any>
  inputType: 'input' | 'textarea'
}

let saveTimeoutId: NodeJS.Timeout

function ContentForm({ type, formSchema, inputType }: Props) {
  const { value = '', setValue, loading } = useProjectContentValue(type)

  const [saved, setSaved] = useState(false)
  const label = labels[type] ?? type
  const description = descriptions[type] ?? ''
  const placeholder = placeholders[type] ?? ''

  const form = useForm({
    resolver: zodResolver(formSchema as any),
    values: {
      value,
    },
  })

  const handleSubmit = useCallback(async (values: any) => {
    clearTimeout(saveTimeoutId)

    await setValue(values.value)
    setSaved(true)

    saveTimeoutId = setTimeout(() => {
      setSaved(false)
    }, 2000)
  }, [
    setValue,
  ])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-xl"
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1 h-4">
                {label}
                {' '}
                {saved && (
                  <div className="mt-0.5 text-xs font-normal text-green-500">
                    Saved!
                  </div>
                )}
              </FormLabel>
              <div className="-mt-1 text-sm text-neutral-500">
                {description}
              </div>
              <div className="flex items-center gap-2">
                {inputType === 'input' && (
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder={placeholder}
                      {...field}
                    />
                  </FormControl>
                )}
                {inputType === 'textarea' && (
                  <FormControl>
                    <TextareaAutosize
                      autoFocus
                      placeholder={placeholder}
                      {...field}
                    />
                  </FormControl>
                )}
                <Button
                  type="submit"
                  loading={loading}
                >
                  Save
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default ContentForm
