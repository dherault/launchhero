import { zodResolver } from '@hookform/resolvers/zod'
import type { DirectoryRequirementType } from 'launchhero-core'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import useProjectContentValues from '~hooks/project/useProjectContentValues'

import TextareaAutosize from '~components/common/TextareaAutosize'
import { placeholders } from '~components/content/constants'
import ContentLabel from '~components/content/ContentLabel'
import { Button } from '~components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
  const { values, setValues, loading } = useProjectContentValues(type)

  const [saved, setSaved] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema as any),
    values: {
      value: values[0] ?? '',
    },
  })

  const handleSubmit = useCallback(async (values: any) => {
    clearTimeout(saveTimeoutId)

    await setValues([values.value])
    setSaved(true)
    onSave?.(values.value)

    saveTimeoutId = setTimeout(() => {
      setSaved(false)
    }, 2000)
  }, [
    setValues,
    onSave,
  ])

  const sumbit = form.handleSubmit(handleSubmit)
  const formValue = form.watch('value')

  return (
    <Form {...form}>
      <form onSubmit={sumbit}>
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <ContentLabel type={type} />
              <div className="flex items-start gap-2">
                {inputType === 'input' && (
                  <FormControl>
                    <Input
                      placeholder={placeholders[type]}
                      className="w-xl"
                      {...field}
                    />
                  </FormControl>
                )}
                {inputType === 'textarea' && (
                  <FormControl>
                    <TextareaAutosize
                      minRows={3}
                      placeholder={placeholders[type]}
                      className="w-xl"
                      {...field}
                      onKeyDown={event => {
                        if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                          event.preventDefault()
                          sumbit()
                        }
                      }}
                    />
                  </FormControl>
                )}
                {!!formValue && formValue !== values[0] && (
                  <Button
                    type="submit"
                    loading={loading}
                  >
                    Save
                  </Button>
                )}
                {saved && (
                  <div className="text-xs font-normal text-green-500 h-10 flex items-center">
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
