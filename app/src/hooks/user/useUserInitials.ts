import useUser from '~hooks/data/useUser'

import extractInitials from '~utils/string/extractInitials'

function useUserInitials() {
  const { user } = useUser()
  const initials = extractInitials(user?.name ?? '')

  return initials.length ? initials : user?.email[0].toUpperCase() ?? '?'
}

export default useUserInitials
