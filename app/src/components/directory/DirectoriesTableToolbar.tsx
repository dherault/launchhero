import _ from 'clsx'
import { ListChecks, Search, Sparkles } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'

import type { SubmissionStatus } from '~types'

import useProject from '~hooks/data/useProject'

import DirectoriesSelectionDialog from '~components/directory/DirectoriesSelectionDialog'
import { Button } from '~components/ui/Button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~components/ui/Select'

type Props = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  status: SubmissionStatus
  setStatus: Dispatch<SetStateAction<SubmissionStatus>>
}

function DirectoriesTableToolbar({
  search,
  setSearch,
  status,
  setStatus,
}: Props) {
  const project = useProject()

  return (
    <div className="overflow-auto">
      <div className="mb-2 min-w-[650px] flex gap-2">
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
          className={_('px-2 border focus-within:border-primary rounded-xs flex gap-2 min-w-[180px] w-[180px]', {
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
          <SelectTrigger className={_('min-w-[180px] w-[180px]', {
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
    </div>
  )
}

export default DirectoriesTableToolbar
