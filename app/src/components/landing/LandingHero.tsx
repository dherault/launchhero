import directories from 'launchhero-directories'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import DirectoriesTable from '~components/directory/DirectoriesTable'
import { AuroraText } from '~components/ui/AuroraText'
import { Button } from '~components/ui/Button'

function LandingHero() {
  return (
    <section className="relative mt-4 md:mt-0 mx-auto md:pt-8 px-4 w-full max-w-4xl flex flex-col items-center">
      <h1 className="text-3xl md:text-6xl font-extrabold text-center text-balance">
        Find your
        {' '}
        <AuroraText>
          first users
        </AuroraText>
        {' '}
        by launching like a pro
      </h1>
      <div className="mt-4 text-sm md:text-lg text-neutral-500 text-center text-balance">
        Launch Hero tracks your product submissions across
        {' '}
        {directories.length}
        {' '}
        directories and handles the busywork for you.
      </div>
      <div className="mt-6 w-full">
        <DirectoriesTable
          hasWebsite
          maxHeight={256 + 32 + 4}
        />
      </div>
      <Link
        to="/-"
        className="mt-4"
      >
        <Button
          size="lg"
          className="group"
        >
          Prepare your launch now
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
        </Button>
      </Link>
    </section>
  )
}

export default LandingHero
