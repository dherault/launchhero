import _ from 'clsx'
import Fuse from 'fuse.js'
import directories from 'launchhero-directories'
import { Check, Link2, ListChecks, Search, Sparkles } from 'lucide-react'
import { useCallback, useMemo, useState, type CSSProperties } from 'react'

import useSearchParameter from '~hooks/common/useSearchParameter'
import useProject from '~hooks/data/useProject'
import useProjects from '~hooks/data/useProjects'
import useSubmissions from '~hooks/data/useSubmissions'

import DirectoriesSelectionDialog from '~components/directory/DirectoriesSelectionDialog'
import DirectoryDialog from '~components/directory/DirectoryDialog'
import DirectoryIcon from '~components/directory/DirectoryIcon'
import DirectorySubmissionStatusChip from '~components/directory/DirectorySubmissionStatusChip'
import DirectoryTagChip from '~components/directory/DirectoryTagChip'
import { Button } from '~components/ui/Button'
import { Checkbox } from '~components/ui/Checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~components/ui/Select'

type Props = {
  hasToolbar?: boolean
  hasCheckbox?: boolean
  hasSubmissionStatus?: boolean
  hasWebsite?: boolean
  maxHeight?: CSSProperties['maxHeight']
}

type SubmissionStatus = 'all' | 'submitted' | 'unsubmitted'

const fuseOptions = {
  keys: [
    'name',
    'tags',
  ],
}

function DirectoriesTable({
  hasToolbar = false,
  hasCheckbox = false,
  hasSubmissionStatus = false,
  hasWebsite = false,
  maxHeight = 'auto',
}: Props) {
  const { updateProject } = useProjects()
  const project = useProject()
  const { submissions } = useSubmissions()

  const [directoryId, setDirectoryId] = useSearchParameter('directory', '')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<SubmissionStatus>('all')
  const fuse = useMemo(() => new Fuse(directories, fuseOptions), [])
  const searchedDirectories = useMemo(() => search ? fuse.search(search).map(result => result.item) : directories, [fuse, search])
  const filteredDirectories = useMemo(() => {
    if (status === 'submitted') return searchedDirectories.filter(directory => submissions.some(s => s.directoryId === directory.id))
    if (status === 'unsubmitted') return searchedDirectories.filter(directory => !submissions.some(s => s.directoryId === directory.id))

    return searchedDirectories
  }, [
    searchedDirectories,
    status,
    submissions,
  ])
  const handleDirectorySelection = useCallback((directoryId: string, selected: boolean) => {
    if (!project?.id) return

    updateProject(project.id, {
      selectedDirectoryIds: selected
        ? [...project.selectedDirectoryIds, directoryId]
        : project.selectedDirectoryIds.filter(id => id !== directoryId),
    })
  }, [
    project?.id,
    project?.selectedDirectoryIds,
    updateProject,
  ])

  return (
    <>
      {hasToolbar && (
        <div className="mb-2 flex gap-2">
          <div className="grow justify- flex gap-2">
            <DirectoriesSelectionDialog>
              <Button
                variant="secondary"
                className={_({
                  'animate-pulse-outline': !project?.selectedDirectoryIds.length,
                })}
              >
                <ListChecks className="h-4 w-4" />
                Help me choose directories
              </Button>
            </DirectoriesSelectionDialog>
            <Button>
              <Sparkles className="h-4 w-4" />
              Submit for me
            </Button>
          </div>
          <div
            className={_('px-2 border focus-within:border-primary rounded-xs flex gap-2 w-64', {
              'border-primary': search,
            })}
          >
            <div className="flex items-center">
              <Search className="h4 w-4 text-neutral-500" />
            </div>
            <input
              type="search"
              placeholder="Search"
              className="grow text-sm outline-none"
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </div>
          <Select
            value={status}
            onValueChange={value => setStatus(value as SubmissionStatus)}
          >
            <SelectTrigger className={_('w-[180px]', {
              'text-neutral-500': status === 'all',
              'border-primary': status !== 'all',
            })}
            >
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">
                  All statuses
                </SelectItem>
                <SelectItem value="submitted">
                  Submitted
                </SelectItem>
                <SelectItem value="unsubmitted">
                  Unsubmitted
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="border rounded-xs">
        <div className="py-2 px-3 flex items-center gap-3 border-b h-[49px] font-medium text-sm">
          {hasCheckbox && (
            <div className="w-6 flex items-center justify-center">
              <Check className="h-4 w-4" />
            </div>
          )}
          <div className="w-8" />
          <div className="grow">
            Directory
          </div>
          {hasSubmissionStatus && (
            <div>
              Status
            </div>
          )}
          {hasWebsite && (
            <div>
              Website
            </div>
          )}
        </div>
        <div
          className="overflow-auto"
          style={{ maxHeight }}
        >
          {filteredDirectories.map(directory => (
            <div
              key={directory.id}
              className="py-2 px-3 border-b last:border-b-0 flex items-center gap-3 hover:bg-neutral-50 cursor-pointer"
              onClick={() => setDirectoryId(directory.id)}
            >
              {hasCheckbox && (
                <div className="flex">
                  <Checkbox
                    onClick={event => event.stopPropagation()}
                    checked={project?.selectedDirectoryIds.includes(directory.id)}
                    onCheckedChange={checked => handleDirectorySelection(directory.id, !!checked)}
                  />
                </div>
              )}
              <DirectoryIcon directory={directory} />
              <div className="grow flex items-center flex-wrap gap-2">
                <div className="font-medium text-sm">
                  {directory.name}
                </div>
                {directory.tags.map(tag => (
                  <DirectoryTagChip
                    key={tag}
                    directoryTag={tag}
                  />
                ))}
              </div>
              {hasSubmissionStatus && (
                <div>
                  <DirectorySubmissionStatusChip directory={directory} />
                </div>
              )}
              {hasWebsite && (
                <div className="flex justify-end">
                  <a
                    href={directory.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={event => event.stopPropagation()}
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <DirectoryDialog
        directoryId={directoryId}
        setDirectoryId={setDirectoryId}
      />
    </>
  )
}

export default DirectoriesTable
