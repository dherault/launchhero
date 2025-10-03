import directories from 'launchhero-directories'
import { useCallback, useState, type PropsWithChildren } from 'react'

import useProject from '~hooks/data/useProject'
import useProjects from '~hooks/data/useProjects'

import { Button } from '~components/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~components/ui/Dialog'

function DirectoriesSelectionDialog({ children }: PropsWithChildren) {
  const project = useProject()
  const { updateProject } = useProjects()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSelect = useCallback(async (selectedDirectoryIds: string[]) => {
    setLoading(true)

    await updateProject(project?.id ?? '', {
      selectedDirectoryIds,
      hasSelectedDirectories: true,
    })

    setLoading(false)
    setOpen(false)
  }, [
    project?.id,
    updateProject,
  ])

  const handleSelectAll = useCallback(() => handleSelect(directories.map(directory => directory.id)), [handleSelect])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogClose />
          <DialogTitle>
            Directory selection
          </DialogTitle>
          <DialogDescription>
            Decide where to submit your project for listing.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleSelectAll}
            loading={loading}
          >
            Select all
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DirectoriesSelectionDialog
