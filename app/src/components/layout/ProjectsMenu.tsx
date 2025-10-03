import { ChevronsUpDown, Plus } from 'lucide-react'
import { useNavigate } from 'react-router'

import useFinalProject from '~hooks/data/useFinalProject'
import useMemberProjects from '~hooks/data/useMemberProjects'
import useProjectContentValues from '~hooks/project/useProjectContentValues'
import useIsMobile from '~hooks/ui/useIsMobile'

import Logo from '~components/common/logos/Logo'
import { Avatar, AvatarFallback, AvatarImage } from '~components/ui/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~components/ui/DropdownMenu'
import { SidebarMenu, SidebarMenuButton } from '~components/ui/Sidebar'

type Props = {
  onSelect: () => void
}

function ProjectsMenu({ onSelect }: Props) {
  // const { user } = useUser()
  const projects = useMemberProjects()
  const finalProject = useFinalProject()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const { values: logos } = useProjectContentValues('logo')

  // const isProjectAdministrator = finalProject?.administratorUserIds.includes(user?.id ?? NULL_DOCUMENT_ID)

  // const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false)

  if (!projects.length) return null
  if (!finalProject) return null

  return (
    <>
      <SidebarMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="xl">
              <Avatar className=" h-10 w-10 rounded-xs border">
                <AvatarImage src={logos[0]} />
                <AvatarFallback className="bg-neutral-50 text-white">
                  <Logo
                    className="text-primary"
                    width={24}
                  />
                </AvatarFallback>
              </Avatar>
              <div className="grow text-sm font-semibold truncate">
                {finalProject.name}
              </div>
              <ChevronsUpDown className="ml-auto shrink-0" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={isMobile ? 'top' : 'right'}
            sideOffset={isMobile ? 0 : 16}
            align="start"
            alignOffset={isMobile ? 8 : 0}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-neutral-500 font-medium">
                Projects
              </DropdownMenuLabel>
              {projects.map(project => (
                <DropdownMenuItem
                  key={project.id}
                  onSelect={() => {
                    navigate(`/-/projects/${project.id}`)
                    onSelect()
                  }}
                  className="max-w-64"
                >
                  {/* {!project.imageUrl && (
                    <div className="mr-2 p-1 border rounded-md">
                      <Pyramid className="h-4 w-4" />
                    </div>
                  )}
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="mr-2 h-6 w-6 rounded-md object-cover"
                    />
                  )} */}
                  <span className="truncate">
                    {project.name}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* {isProjectAdministrator && (
              <DropdownMenuItem
                onSelect={() => {
                  navigate(`/-/organizations/${finalProject.id}/billing`)
                  onSelect()
                }}
              >
                <div className="mr-2 p-1 border rounded-md">
                  <CreditCard className="h-4 w-4" />
                </div>
                Plan & Billing
              </DropdownMenuItem>
            )} */}
            {/* <DropdownMenuItem
              onSelect={() => {
                setIsMembersDialogOpen(true)

                if (!isMobile) onSelect()
              }}
            >
              <div className="mr-2 p-1 border rounded-md">
                <Users className="h-4 w-4" />
              </div>
              Team members
            </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              onSelect={() => {
                navigate('/-/onboarding')
                onSelect()
              }}
            >
              <div className="p-0.5 border rounded-xs">
                <Plus className="h-4 w-4" />
              </div>
              Create a new project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenu>
      {/* <OrganizationMembersDialog
        open={isMembersDialogOpen}
        setOpen={setIsMembersDialogOpen}
      /> */}
    </>
  )
}

export default ProjectsMenu
