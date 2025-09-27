import { Shield } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '~components/ui/Button'

function Administrator() {
  return (
    <>
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        <Shield className="h-6 w-6" />
        Administrator
      </h1>
      <div className="mt-2 flex gap-2">
        <Link to="users">
          <Button variant="outline">
            Users
          </Button>
        </Link>
        <Link to="project">
          <Button variant="outline">
            Projects
          </Button>
        </Link>
      </div>
    </>
  )
}

export default Administrator
