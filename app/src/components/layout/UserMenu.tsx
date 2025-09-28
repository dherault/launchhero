import {
  ChevronsUpDown,
  LifeBuoy,
  LogOut,
  Shield,
} from 'lucide-react'
import { useCallback } from 'react'
import { Link } from 'react-router'

import useUser from '~hooks/data/useUser'
import useIsMobile from '~hooks/ui/useIsMobile'
import useUserInitials from '~hooks/user/useUserInitials'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~components/ui/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~components/ui/DropdownMenu'
import {
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from '~components/ui/Sidebar'

function UserMenu() {
  const { user, signOut } = useUser()
  const { setOpenMobile } = useSidebar()
  const initials = useUserInitials()
  const isMobile = useIsMobile()

  const closeMobileSidebar = useCallback(() => {
    setOpenMobile(false)
  }, [
    setOpenMobile,
  ])

  return (
    <SidebarMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton size="xl">
            <Avatar className="rounded-xs h-10 w-10">
              <AvatarImage src={user?.imageUrl ?? undefined} />
              <AvatarFallback className="bg-neutral-50 border rounded-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1">
              <div className="font-semibold text-sm truncate leading-tight">
                {user?.name ?? 'User'}
              </div>
              <div className="text-xs truncate text-neutral-500">
                {user?.email}
              </div>
            </div>
            <ChevronsUpDown className="ml-auto shrink-0" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          sideOffset={isMobile ? -64 : 16}
          align="end"
        >
          {user?.isAdministrator && (
            <>
              <Link
                to="/-/administrator"
                onClick={closeMobileSidebar}
              >
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  Administrator
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </>
          )}
          {/* <Link
            to="/-/account"
            onClick={closeMobileSidebar}
          >
            <DropdownMenuItem>
              <User2 className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
          </Link> */}
          <Link
            to="/support"
            onClick={closeMobileSidebar}
          >
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              Support
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              closeMobileSidebar()
              signOut()
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenu>
  )
}

export default UserMenu
