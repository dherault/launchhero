import { ArrowLeft } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router'

import Logo from '~components/common/logos/Logo'
import { Button } from '~components/ui/Button'

function LegalLayout({ children }: PropsWithChildren) {
  const navigate = useNavigate()

  return (
    <div className="mt-8 mx-auto pt-2 pb-16 px-4 md:px-8 container max-w-4xl">
      <div className="mb-8 flex flex-col items-center">
        <Logo width={48} />
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-primary text-center text-balance">
          Launch Hero
        </h1>
      </div>
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Go back
      </Button>
      <div className="mt-2 pt-8 px-8 bg-white border rounded-lg">
        {children}
      </div>
    </div>
  )
}

export default LegalLayout
