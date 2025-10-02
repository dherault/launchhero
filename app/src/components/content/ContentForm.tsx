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
  onSave?: (value: any) => void
}

let saveTimeoutId: NodeJS.Timeout

function ContentForm({ type, formSchema, inputType, onSave }: Props) {
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
    onSave?.(values.value)

    saveTimeoutId = setTimeout(() => {
      setSaved(false)
    }, 2000)
  }, [
    setValue,
    onSave,
  ])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {label}
              </FormLabel>
              <div className="text-sm text-neutral-500">
                {description}
              </div>
              <div className="flex items-center gap-2">
                {inputType === 'input' && (
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      className="w-xl"
                      {...field}
                    />
                  </FormControl>
                )}
                {inputType === 'textarea' && (
                  <FormControl>
                    <TextareaAutosize
                      placeholder={placeholder}
                      className="w-xl"
                      {...field}
                    />
                  </FormControl>
                )}
                {form.watch('value') !== value && (
                  <Button
                    type="submit"
                    loading={loading}
                  >
                    Save
                  </Button>
                )}
                {saved && (
                  <div className="text-xs font-normal text-green-500">
                    Saved!
                  </div>
                )}
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
