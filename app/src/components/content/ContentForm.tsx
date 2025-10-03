import { zodResolver } from '@hookform/resolvers/zod'
import type { DirectoryRequirementType } from 'launchhero-core'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import useProjectContentValues from '~hooks/project/useProjectContentValues'

import Spinner from '~components/common/Spinner'
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

  const submit = form.handleSubmit(handleSubmit)
  const formValue = form.watch('value')

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      submit()
    }
  }, [
    submit,
  ])

  return (
    <Form {...form}>
      <form onSubmit={submit}>
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
                      onKeyDown={handleKeyDown}
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
                      onKeyDown={handleKeyDown}
                    />
                  </FormControl>
                )}
                {!!formValue && !loading && formValue !== values[0] && (
                  <Button type="submit">
                    Save
                  </Button>
                )}
                <div className="h-10 flex items-center">
                  {loading && (
                    <Spinner className="h-4 w-4" />
                  )}
                  {saved && (
                    <div className="text-xs font-normal text-green-500">
                      Saved!
                    </div>
                  )}
                </div>
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
