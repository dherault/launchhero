import composeLayout from '~utils/layout/composeLayout'

import AuthenticationProvider from '~components/authentication/_AuthenticationProvider'
import ReferenceProvider from '~components/common/_ReferenceProvider'
import ToasterProvider from '~components/common/_ToasterProvider'
import AppLayout from '~components/layout/AppLayout'
import ProjectsProvider from '~components/project/_ProjectsProvider'
import { SidebarProvider } from '~components/ui/Sidebar'

export default composeLayout(
  SidebarProvider,
  ToasterProvider,
  AuthenticationProvider,
  ReferenceProvider,
  ProjectsProvider,
  AppLayout,
)
