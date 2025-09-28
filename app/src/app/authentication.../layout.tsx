import composeLayout from '~utils/layout/composeLayout'

import AuthenticationLayout from '~components/authentication/AuthenticationLayout'
import AuthenticationRedirect from '~components/authentication/AuthenticationRedirect'
import AuthenticationWait from '~components/authentication/AuthenticationWait'

export default composeLayout(
  AuthenticationWait,
  AuthenticationRedirect,
  AuthenticationLayout,
)
