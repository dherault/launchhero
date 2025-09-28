import composeLayout from '~utils/layout/composeLayout'

import AuthenticationProvider from '~components/authentication/_AuthenticationProvider'
import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import AuthenticationWait from '~components/authentication/AuthenticationWait'
import SidebarLayout from '~components/layout/SidebarLayout'
import ProjectsWait from '~components/project/ProjectsWait'

export default composeLayout(
  AuthenticationProvider,
  AuthenticationWait,
  AuthenticationBouncer,
  ProjectsWait,
  SidebarLayout,
)
