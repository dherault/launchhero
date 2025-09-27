import { Shield } from 'lucide-react'
import { DateTime } from 'luxon'
import { useNavigate } from 'react-router'

import useProjects from '~hooks/data/useProjects'

import pluralize from '~utils/string/pluralize'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~components/ui/Table'

function AdministratorProjects() {
  const { projects } = useProjects()
  const navigate = useNavigate()

  return (
    <>
      <h1 className="flex items-center gap-2">
        <Shield className="h-6 w-6" />
        {projects.length}
        {' '}
        {pluralize('Project', projects.length)}
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Name
            </TableHead>
            <TableHead>
              Members
            </TableHead>
            <TableHead>
              Created at
            </TableHead>
            <TableHead>
              Updated at
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map(project => (
            <TableRow
              key={project.id}
              onClick={() => navigate(`/-/projects/${project.id}`)}
              className="cursor-pointer"
            >
              <TableCell>
                {project.name}
              </TableCell>
              <TableCell>
                {project.memberUserIds.length}
              </TableCell>
              <TableCell>
                {DateTime.fromISO(project.createdAt).toLocaleString(DateTime.DATETIME_MED)}
              </TableCell>
              <TableCell>
                {DateTime.fromISO(project.updatedAt).toRelative()}
              </TableCell>
              <TableCell className="text-right">
                {project.deletedAt ? '❌' : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>

  )
}

export default AdministratorProjects
