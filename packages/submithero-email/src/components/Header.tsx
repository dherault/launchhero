import {
  Heading,
  Img,
} from '@react-email/components'
import type { PropsWithChildren } from 'react'
import { APP_URL } from 'submithero-core'

function Header({ children }: PropsWithChildren) {
  return (
    <>
      <Img
        src={`${APP_URL}/images/logo/logo.png`}
        width={48}
        alt="Submit Hero"
        className="mx-auto mt-4"
      />
      <Heading className="mt-4 mb-0 text-center leading-8 text-primary text-balance">
        {children}
      </Heading>
    </>
  )
}

export default Header
