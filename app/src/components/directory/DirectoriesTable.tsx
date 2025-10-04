import Fuse from 'fuse.js'
import directories from 'launchhero-directories'
import { Check, Info, Link2 } from 'lucide-react'
import { useCallback, useMemo, useState, type CSSProperties } from 'react'

import type { SubmissionStatus } from '~types'

import useSearchParameter from '~hooks/common/useSearchParameter'
import useProject from '~hooks/data/useProject'
import useProjects from '~hooks/data/useProjects'
import useSubmissions from '~hooks/data/useSubmissions'

import ResponsiveTooltip from '~components/common/ResponsiveTooltip'
import DirectoriesTableToolbar from '~components/directory/DirectoriesTableToolbar'
import DirectoryDialog from '~components/directory/DirectoryDialog'
import DirectoryIcon from '~components/directory/DirectoryIcon'
import DirectorySubmissionStatusChip from '~components/directory/DirectorySubmissionStatusChip'
import DirectoryTagChip from '~components/directory/DirectoryTagChip'
import DomainAuthority from '~components/directory/DomainAuthority'
import { Button } from '~components/ui/Button'
import { Checkbox } from '~components/ui/Checkbox'

type Props = {
  hasToolbar?: boolean
  hasCheckbox?: boolean
  hasSubmissionStatus?: boolean
  hasWebsite?: boolean
  maxHeight?: CSSProperties['maxHeight']
}

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
        <DirectoriesTableToolbar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />
      )}
      <div className="border rounded-xs overflow-auto">
        <div className="py-2 px-3 min-w-[650px] flex items-center gap-3 border-b h-[49px] font-medium text-sm">
          {hasCheckbox && (
            <div className="w-6 flex items-center justify-center">
              <Check className="h-4 w-4" />
            </div>
          )}
          <div className="w-8" />
          <div className="grow">
            Directory
          </div>
          <div className="w-36 flex items-center gap-2">
            Domain Authority
            <ResponsiveTooltip
              content="Domain Authority (DA) is a search engine ranking score that predicts how well a website will rank on search engine result pages. Submitting to a directory with a higher DA means better ranking potential."
              contentProps={{
                className: 'max-w-xs',
                sideOffset: 8,
              }}
            >
              <Info className="h-3 w-3 text-neutral-500 cursor-help" />
            </ResponsiveTooltip>
          </div>
          {hasSubmissionStatus && (
            <div className="w-38">
              Status
            </div>
          )}
          {hasWebsite && (
            <div className="w-14">
              Website
            </div>
          )}
        </div>
        <div
          className="min-w-[650px] overflow-auto"
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
              <div className="w-36 text-sm">
                <DomainAuthority value={directory.domainAuthority} />
              </div>
              {hasSubmissionStatus && (
                <div className="w-38">
                  <DirectorySubmissionStatusChip directory={directory} />
                </div>
              )}
              {hasWebsite && (
                <div className="w-14 flex justify-end">
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
