import type { PropsWithChildren } from 'react'

import LandingFooter from '~components/landing/LandingFooter'
import LandingNav from '~components/landing/LandingNav'

function LandingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LandingNav />
      {children}
      <LandingFooter />
    </>
  )
}

export default LandingLayout
