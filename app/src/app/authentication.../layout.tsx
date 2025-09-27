import composeLayout from '~utils/layout/composeLayout'

import AuthenticationLayout from '~components/authentication/AuthenticationLayout'
import AuthenticationRedirect from '~components/authentication/AuthenticationRedirect'

export default composeLayout(
  AuthenticationRedirect,
  AuthenticationLayout,
)
