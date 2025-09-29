import { Link } from 'react-router'

import DirectoriesTable from '~components/directory/DirectoriesTable'
import { Button } from '~components/ui/Button'

import directories from '~data/directories'

function LandingHero() {
  return (
    <section className="relative mt-8 mx-auto md:pt-8 px-4 w-full max-w-4xl flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center text-balance">
        Launch your product and find your first users
      </h1>
      <div className="mt-2 md:text-lg text-neutral-500 text-center text-balance">
        Launch Hero lets you track your product submissions across
        {' '}
        {directories.length}
        {' '}
        directories, and can even submit it for you.
      </div>
      <div className="mt-4 w-full">
        <DirectoriesTable />
      </div>
      <Link
        to="/-"
        className="mt-4"
      >
        <Button size="lg">
          Prepare your launch
        </Button>
      </Link>
    </section>
  )
}

export default LandingHero
