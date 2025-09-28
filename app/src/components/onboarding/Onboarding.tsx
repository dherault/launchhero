import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as z from 'zod'

import { MAX_PROJECT_NAME_LENGTH } from '~constants'

import useProjects from '~hooks/data/useProjects'

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

const projectFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(MAX_PROJECT_NAME_LENGTH, `Name must be at most ${MAX_PROJECT_NAME_LENGTH} characters`)
    .trim(),
})

type ProjectFormSchema = z.infer<typeof projectFormSchema>

function Onboarding() {
  const { createProject } = useProjects()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const projectForm = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleSubmit = useCallback(async (values: ProjectFormSchema) => {
    if (loading) return

    setLoading(true)

    const project = await createProject(values.name)

    setLoading(false)

    if (!project) return

    navigate(`/-/projects/${project.id}`)
  }, [
    loading,
    createProject,
    navigate,
  ])

  return (
    <>
      <h1 className="text-2xl font-semibold text-center">
        Welcome!
      </h1>
      <Form {...projectForm}>
        <form
          onSubmit={projectForm.handleSubmit(handleSubmit)}
          className="mt-8 space-y-4"
        >
          <FormField
            control={projectForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Give a name to your project:
                </FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    placeholder="Airbnb"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              loading={loading}
            >
              Create project
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default Onboarding
