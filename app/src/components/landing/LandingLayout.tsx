import type { PropsWithChildren } from 'react'

import LandingFooter from '~components/landing/LandingFooter'

function LandingLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <LandingFooter />
    </>
  )
}

export default LandingLayout
