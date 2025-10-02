import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  title: string
}>

function ContentSection({ title, children }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default ContentSection
