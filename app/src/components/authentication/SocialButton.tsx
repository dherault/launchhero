import _ from 'clsx'
import { type AuthProvider, signInWithPopup } from 'firebase/auth'
import { type ButtonHTMLAttributes, useCallback, useState } from 'react'

import { authentication } from '~firebase'

import Spinner from '~components/common/Spinner'
import { Button } from '~components/ui/Button'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  firebaseAuthProvider: AuthProvider
  logoSrc: string
}

function SocialButton({
  firebaseAuthProvider,
  logoSrc,
  children,
  className,
  ...props
}: Props) {
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(() => {
    setLoading(true)

    signInWithPopup(authentication, firebaseAuthProvider)
      .catch(error => {
        console.error(error.code)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [
    firebaseAuthProvider,
  ])

  return (
    <Button
      {...props}
      onClick={handleClick}
      className={_('w-full bg-white hover:bg-neutral-100 text-neutral-900 border elevation-1', className)}
    >
      {loading && (
        <Spinner className="w-6 h-6" />
      )}
      {!loading && (
        <img
          src={logoSrc}
          alt={firebaseAuthProvider.providerId}
          className="w-6 h-6"
        />
      )}
      <div className="ml-1">
        {children}
      </div>
    </Button>
  )
}

export default SocialButton
