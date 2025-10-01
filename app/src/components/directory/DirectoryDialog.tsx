import { zodResolver } from '@hookform/resolvers/zod'
import directories from 'launchhero-directories'
import { Ban, Pen, SquareArrowOutUpRight, SquarePlus } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import useConfetti from '~hooks/common/useConfetti'
import usePersistedState from '~hooks/common/usePersistedState'
import useProject from '~hooks/data/useProject'
import useSubmissions from '~hooks/data/useSubmissions'

import DirectoryIcon from '~components/directory/DirectoryIcon'
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
    .trim(),
})

type SubmissionFormSchema = z.infer<typeof submissionFormSchema>

function DirectoryDialog({ directoryId, setDirectoryId }: Props) {
  const project = useProject()!
  const { submissions, createSubmission, deleteSubmission, updateSubmission, loading: loadingSubmissions } = useSubmissions()
  const directory = useMemo(() => directories.find(directory => directory.id === directoryId) ?? null, [directoryId])
  const submission = useMemo(() => submissions.find(submission => submission.directoryId === directoryId) ?? null, [directoryId, submissions])

  const fireConfetti = useConfetti()

  const [edited, setEdited] = useState(false)
  const [loadingHandler, setLoadingHandler] = useState(false)
  const [submissionUrl, setSubmissionUrl] = usePersistedState(`${project.id}-${directoryId}-submission-url`, submission?.url ?? '')

  const loading = loadingSubmissions || loadingHandler

  const submissionForm = useForm<SubmissionFormSchema>({
    resolver: zodResolver(submissionFormSchema),
    values: {
      url: submissionUrl,
    },
  })

  const handleMarkAsSubmitted = useCallback(async () => {
    setLoadingHandler(true)

    if (submission) {
      await deleteSubmission(submission.id)
    }
    else {
      fireConfetti()
      await createSubmission(directoryId, submissionUrl)
      setEdited(true)
    }

    setLoadingHandler(false)
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

    setLoadingHandler(true)
    setSubmissionUrl(values.url)

    await updateSubmission(submission.id, { url: values.url })

    setEdited(false)
    setLoadingHandler(false)
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
      <DialogContent className="sm:max-w-2xl">
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
                      <Button
                        type="submit"
                        loading={loading}
                      >
                        Save link
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
        <DialogFooter>
          {!!submission && (
            <>
              {!edited && (
                <Button
                  variant="secondary"
                  onClick={() => setEdited(true)}
                >
                  <Pen className="h-4 w-4" />
                  Edit submission link
                </Button>
              )}
              <a
                href={submission.url!}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary">
                  <SquareArrowOutUpRight className="h-4 w-4" />
                  Visit submission
                </Button>
              </a>
              <Button
                onClick={handleMarkAsSubmitted}
                loading={loading}
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
              <Button
                onClick={handleMarkAsSubmitted}
                loading={loading}
              >
                <SquarePlus className="h-4 w-4" />
                Mark as submitted
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DirectoryDialog
