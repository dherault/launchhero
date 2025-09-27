import { Menu } from 'lucide-react'
import { Link } from 'react-router'

import LoginButton from '~components/common/LoginButton'
import LogoType from '~components/common/logos/LogoType'
import { Button } from '~components/ui/Button'
import { Sheet, SheetContent, SheetTrigger } from '~components/ui/Sheet'

const links = (
  <>
  </>
)

function LandingNav() {
  return (
    <nav className="py-3 pl-4 pr-2 flex items-center gap-4 md:gap-8">
      <Sheet>
        <SheetTrigger
          asChild
          className="flex md:hidden"
        >
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 -mr-2.5"
          >
            <Menu className="h-5 w-5 text-primary" />
            <span className="sr-only">
              Open menu
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[256px] flex flex-col gap-4"
        >
          <Link
            to="/"
            className="shrink-0"
          >
            <LogoType />
          </Link>
          <div className="space-y-2 text-lg font-semibold text-primary">
            {links}
          </div>
        </SheetContent>
      </Sheet>
      <Link
        to="/"
        className="shrink-0"
      >
        <LogoType />
      </Link>
      <div className="mt-0.75 hidden md:flex items-center gap-4 font-semibold text-primary">
        {links}
      </div>
      <div className="-ml-8 grow" />
      <LoginButton />
    </nav>
  )
}

export default LandingNav
