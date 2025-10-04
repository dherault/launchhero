import { zodResolver } from '@hookform/resolvers/zod'
import { Ban, Pen, SquareArrowOutUpRight, SquarePlus, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import useConfetti from '~hooks/common/useConfetti'
import usePersistedState from '~hooks/common/usePersistedState'
import useDirectory from '~hooks/data/useDirectory'
import useProject from '~hooks/data/useProject'
import useSubmission from '~hooks/data/useSubmission'
import useSubmissions from '~hooks/data/useSubmissions'

import Spinner from '~components/common/Spinner'
import DirectoryIcon from '~components/directory/DirectoryIcon'
import DirectoryRequirements from '~components/directory/DirectoryRequirements'
import DirectorySubmissionStatusChip from '~components/directory/DirectorySubmissionStatusChip'
import { Button } from '~components/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~components/ui/Dialog'
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
  directoryId: string
  setDirectoryId: (id: string) => void
}

const submissionFormSchema = z.object({
  url: z
    .url()
    .trim()
    .or(z.literal('')),
})

type SubmissionFormSchema = z.infer<typeof submissionFormSchema>

function DirectoryDialog({ directoryId, setDirectoryId }: Props) {
  const project = useProject()
  const { createSubmission, deleteSubmission, updateSubmission, loading: loadingSubmissions } = useSubmissions()
  const directory = useDirectory(directoryId)
  const submission = useSubmission(directoryId)
  const fireConfetti = useConfetti()

  const [edited, setEdited] = useState(false)
  const [loadingSubmission, setLoadingSubmission] = useState(false)
  const [submissionUrl, setSubmissionUrl] = usePersistedState(`${project?.id ?? ''}-${directoryId}-submission-url`, submission?.url ?? '', {
    enabled: !!project,
  })

  const loading = loadingSubmissions || loadingSubmission

  const submissionForm = useForm<SubmissionFormSchema>({
    resolver: zodResolver(submissionFormSchema),
    values: {
      url: submissionUrl,
    },
  })

  const handleMarkAsSubmitted = useCallback(async () => {
    setLoadingSubmission(true)

    if (submission) {
      await deleteSubmission(submission.id)
    }
    else {
      fireConfetti()
      await createSubmission(directoryId, submissionUrl)
      setEdited(true)
    }

    setLoadingSubmission(false)
  }, [
    directoryId,
    submission,
    submissionUrl,
    createSubmission,
    deleteSubmission,
    fireConfetti,
  ])

  const handleSubmit = useCallback(async (values: SubmissionFormSchema) => {
    if (!submission?.id) return

    setLoadingSubmission(true)
    setSubmissionUrl(values.url ?? '')

    await updateSubmission(submission.id, { url: values.url })

    setEdited(false)
    setLoadingSubmission(false)
  }, [
    submission?.id,
    updateSubmission,
    setSubmissionUrl,
  ])

  if (!directory) return null

  return (
    <Dialog
      open={!!directoryId}
      onOpenChange={open => {
        if (open) return

        setDirectoryId('')
        setEdited(false)
      }}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogClose />
          <DialogTitle>
            <DirectoryIcon directory={directory} />
            {directory.name}
            <DirectorySubmissionStatusChip directory={directory} />
          </DialogTitle>
          <DialogDescription>
            {directory.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mb-2">
          {!!submission && edited && (
            <Form {...submissionForm}>
              <form onSubmit={submissionForm.handleSubmit(handleSubmit)}>
                <FormField
                  control={submissionForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Paste the link to your product on
                        {' '}
                        {directory.name}
                        {' '}
                        to access it quickly later.
                      </FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input
                            autoFocus
                            placeholder={`${directory.url}/xyz/${project?.id ?? 'project'}`}
                            {...field}
                          />
                        </FormControl>
                        {!loading && (
                          <>
                            <Button type="submit">
                              Save link
                            </Button>
                            <Button
                              type="reset"
                              variant="secondary"
                              size="icon"
                              onClick={() => {
                                setEdited(false)
                                submissionForm.clearErrors()
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {loading && (
                          <Spinner className="ml-3 h-4 w-4" />
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
          {!submission && !edited && (
            <DirectoryRequirements directoryId={directoryId} />
          )}
        </div>
        <DialogFooter>
          {!!submission && (
            <>
              {!edited && (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setEdited(true)
                      submissionForm.clearErrors()
                    }}
                  >
                    <Pen className="h-4 w-4" />
                    Edit submission link
                  </Button>
                  {!!submission.url && (
                    <a
                      href={submission.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="secondary">
                        <SquareArrowOutUpRight className="h-4 w-4" />
                        Visit submission
                      </Button>
                    </a>
                  )}
                </>
              )}
              <Button
                onClick={handleMarkAsSubmitted}
                disabled={loading}
                variant="secondary"
              >
                <Ban className="h-4 w-4" />
                Unmark as submitted
              </Button>
            </>
          )}
          {!submission && (
            <>
              <a
                href={directory.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary">
                  <SquareArrowOutUpRight className="h-4 w-4" />
                  Visit website
                </Button>
              </a>
              <a
                href={directory.submissionUrl || directory.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary">
                  <SquareArrowOutUpRight className="h-4 w-4" />
                  Start submission
                </Button>
              </a>
              {!!project && (
                <Button
                  onClick={handleMarkAsSubmitted}
                  disabled={loading}
                >
                  <SquarePlus className="h-4 w-4" />
                  Mark as submitted
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DirectoryDialog
