import {
  Heading,
  Img,
} from '@react-email/components'
import { APP_URL } from 'launchhero-core'
import type { PropsWithChildren } from 'react'

function Header({ children }: PropsWithChildren) {
  return (
    <>
      <Img
        src={`${APP_URL}/images/logo/logo.png`}
        width={48}
        alt="Launch Hero"
        className="mx-auto mt-4"
      />
      <Heading className="mt-4 mb-0 text-center leading-8 text-primary text-balance">
        {children}
      </Heading>
    </>
  )
}

export default Header
