import type { PropsWithChildren } from 'react'

function LandingCartouche({ children }: PropsWithChildren) {
  return (
    <div className="pl-2 text-sm md:text-base text-primary font-semibold text-nowrap border-l-2 border-primary">
      {children}
    </div>
  )
}

export default LandingCartouche
