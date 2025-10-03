import _ from 'clsx'
import type { PropsWithChildren } from 'react'
import { useEffect, useRef, useState } from 'react'

type Props = PropsWithChildren<{
  title: string
}>

function ContentSection({ title, children }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(entry.intersectionRatio < 1)
      },
      { threshold: [1], rootMargin: '-2px 0px 0px 0px' },
    )

    if (headingRef.current) {
      observer.observe(headingRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section>
      <h2
        ref={headingRef}
        className={_('py-4 px-8 sticky top-0 text-lg font-medium bg-white border-b z-50', {
          'border-t': !isStuck,
        })}
      >
        {title}
      </h2>
      <div className="my-8 px-8 space-y-8">
        {children}
      </div>
    </section>
  )
}

export default ContentSection
