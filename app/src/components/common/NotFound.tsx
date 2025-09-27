import { Link, useLocation } from 'react-router'

import useUser from '~hooks/data/useUser'

import { Button } from '~components/ui/Button'

type Props = {
  source?: string
}

function NotFound({ source }: Props) {
  const { user } = useUser()
  const { pathname } = useLocation()

  return (
    <div className="p-4 fixed inset-0 bg-white flex flex-col items-center justify-center text-center z-50">
      ¯\_(ツ)_/¯
      <br />
      Page not found
      {!!source && (
        <div className="text-xs text-neutral-500">
          Source:
          {' '}
          {source}
        </div>
      )}
      <Link
        to={user && pathname.startsWith('/-') ? '/-' : '/'}
        className="mt-6"
      >
        <Button>
          Go home
        </Button>
      </Link>
      <Link
        to="/support"
        className="mt-2 text-primary hover:underline text-xs"
      >
        Contact support
      </Link>
    </div>
  )
}

export default NotFound
