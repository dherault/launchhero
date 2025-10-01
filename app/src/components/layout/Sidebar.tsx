import {
  Box,
  ListChecks,
  Shapes,
} from 'lucide-react'
import { useCallback } from 'react'
import { Link } from 'react-router'

import useFinalProject from '~hooks/data/useFinalProject'
import useMemberProjects from '~hooks/data/useMemberProjects'

import ProjectsMenu from '~components/layout/ProjectsMenu'
import UserMenu from '~components/layout/UserMenu'
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~components/ui/Sidebar'

function Sidebar() {
  const projects = useMemberProjects()
  const finalProject = useFinalProject()
  const { setOpenMobile } = useSidebar()

  const handleSelect = useCallback(() => {
    setOpenMobile(false)
  }, [
    setOpenMobile,
  ])

  const hasProject = !!(projects.length && finalProject)

  return (
    <SidebarComponent>
      {hasProject && (
        <SidebarHeader>
          <ProjectsMenu onSelect={handleSelect} />
        </SidebarHeader>
      )}
      <SidebarContent>
        {hasProject && (
          <SidebarGroup>
            <SidebarGroupLabel>
              Prepare your launch
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    onClick={handleSelect}
                  >
                    <Link to={`/-/projects/${finalProject.id}/directories`}>
                      <ListChecks />
                      <span>
                        Directories
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    onClick={handleSelect}
                  >
                    <Link to={`/-/projects/${finalProject.id}/content`}>
                      <Shapes />
                      <span>
                        Project content
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        {!hasProject && (
          <SidebarGroup>
            <SidebarGroupLabel>
              Start
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    onClick={handleSelect}
                  >
                    <Link to="/-/onboarding">
                      <Box />
                      <span>
                        Onboarding
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </SidebarComponent>
  )
}

export default Sidebar
