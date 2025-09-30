import type { DirectoryTag } from 'launchhero-core'
import directories from 'launchhero-directories'
import { Ellipsis, Link2 } from 'lucide-react'
import type { CSSProperties } from 'react'

import useSearchParameter from '~hooks/common/useSearchParameter'

import extractInitials from '~utils/string/extractInitials'

import DirectoryDialog from '~components/directory/DirectoryDialog'
import DirectorySubmissionStatusChip from '~components/directory/DirectorySubmissionStatusChip'
import DirectoryTagChip from '~components/directory/DirectoryTagChip'
import { Button } from '~components/ui/Button'

type Props = {
  hasSubmissionStatus?: boolean
  hasAction?: boolean
  hasWebsite?: boolean
  maxHeight?: CSSProperties['maxHeight']
}

function DirectoriesTable({
  hasSubmissionStatus = false,
  hasAction = false,
  hasWebsite = false,
  maxHeight = 'auto',
}: Props) {
  const [directoryId, setDirectoryId] = useSearchParameter('directory', '')

  return (
    <>
      <div className="border rounded-xs">
        <div className="py-2 px-3 flex items-center gap-3 border-b h-[49px] font-medium text-sm">
          <div className="w-8" />
          <div className="grow">
            Directory
          </div>
          {hasSubmissionStatus && (
            <div className="w-32">
              Status
            </div>
          )}
          {hasWebsite && (
            <div>
              Website
            </div>
          )}
          {hasAction && (
            <div className="w-8" />
          )}
        </div>
        <div
          className="overflow-auto"
          style={{ maxHeight }}
        >
          {directories.map(directory => (
            <div
              key={directory.id}
              className="py-2 px-3 border-b last:border-b-0 flex items-center gap-3 hover:bg-neutral-50 cursor-pointer"
              onClick={() => setDirectoryId(directory.id)}
            >
              <div className="flex">
                {!!directory.imageUrl && (
                  <img
                    src={directory.imageUrl}
                    alt={directory.name}
                    className="h-8 w-8 rounded-xs object-contain border"
                  />
                )}
                {!directory.imageUrl && (
                  <div className="flex h-8 w-8 items-center justify-center rounded border bg-neutral-50 text-sm font-medium">
                    {extractInitials(directory.name)}
                  </div>
                )}
              </div>
              <div className="grow flex items-center flex-wrap gap-2">
                <div className="font-medium text-sm">
                  {directory.name}
                </div>
                {directory.tags.map(tag => (
                  <DirectoryTagChip
                    key={tag}
                    directoryTag={tag as DirectoryTag}
                  />
                ))}
              </div>
              {hasSubmissionStatus && (
                <div className="w-32">
                  <DirectorySubmissionStatusChip directoryId={directory.id} />
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
              {hasAction && (
                <div className="flex justify-end">
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={event => event.stopPropagation()}
                  >
                    <Ellipsis className="h-4 w-4" />
                  </Button>
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
