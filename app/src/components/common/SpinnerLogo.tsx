import { useEffect, useState } from 'react'

import Logo from '~components/common/logos/Logo'

let retainedAngle = 0
const SPEED = 0.5

function SpinnerLogo() {
  const [angle, setAngle] = useState(retainedAngle)

  useEffect(() => {
    let animationFrameRequest = 0

    function loop() {
      animationFrameRequest = requestAnimationFrame(() => {
        setAngle(x => (x + SPEED) % 360)
        retainedAngle = (retainedAngle + SPEED) % 360
        loop()
      })
    }

    loop()

    return () => {
      cancelAnimationFrame(animationFrameRequest)
    }
  }, [])

  return (
    <Logo
      style={{ transform: `rotate(${angle}deg)` }}
      className="w-24"
    />
  )
}

export default SpinnerLogo
