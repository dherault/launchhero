import type { DirectoryRequirement } from 'launchhero-core'
import { Check, Pen } from 'lucide-react'
import { Link } from 'react-router'

import useDirectory from '~hooks/data/useDirectory'
import useProject from '~hooks/data/useProject'
import useProjectContentValues from '~hooks/project/useProjectContentValues'

import labels, { descriptions } from '~components/content/constants'
import { Button } from '~components/ui/Button'
import { Label } from '~components/ui/Label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~components/ui/Table'

type Props = {
  directoryId: string
}

function DirectoryRequirements({ directoryId }: Props) {
  const project = useProject()
  const directory = useDirectory(directoryId)

  if (!directory?.requirements.length) return null

  let total = 0
  let met = 0

  if (project) {
    directory.requirements.forEach(requirement => {
      total++
      const values = project.contents.filter(content => content.type === requirement.type).map(content => content.value)

      if (values.some(value => !!value.trim())) {
        met++
      }
    })
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <Label>
          Required information:
          {' '}
          {total > 0 ? `${met} / ${total}` : ''}
        </Label>
        {!!project && met < total && (
          <Link to={`/-/projects/${project.id}/information`}>
            <Button>
              <Pen className="h-4 w-4" />
              Edit project information
            </Button>
          </Link>
        )}
      </div>
      <Table className="mt-2 border rounded-xs text-sm">
        <TableHeader>
          <TableRow>
            {!!project && (
              <TableHead />
            )}
            <TableHead>
              Information
            </TableHead>
            <TableHead>
              Description
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {directory.requirements.map(requirement => (
            <DirectoryRequirementItem
              key={requirement.type}
              directoryRequirement={requirement}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

type DirectoryRequirementItemProps = {
  directoryRequirement: DirectoryRequirement
}

function DirectoryRequirementItem({ directoryRequirement }: DirectoryRequirementItemProps) {
  const project = useProject()
  const { values } = useProjectContentValues(directoryRequirement.type)
  const hasMetRequirement = values.some(value => !!value.trim())

  return (
    <TableRow>
      {!!project && (
        <TableCell>
          {hasMetRequirement && <Check className="h-4 w-4 text-green-500" />}
        </TableCell>
      )}
      <TableCell>
        <div className="flex items-center gap-1">
          {labels[directoryRequirement.type]}
          {!directoryRequirement.optional && (
            <div className="text-sm text-red-500">
              *
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        {descriptions[directoryRequirement.type] }
      </TableCell>
    </TableRow>
  )
}

export default DirectoryRequirements
