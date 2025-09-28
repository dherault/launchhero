import { pretty, render, toPlainText } from '@react-email/render'
import type { ComponentProps } from 'react'

import Welcome from './emails/Welcome'

const emails = {
  welcome: {
    createSubject: () => 'Welcome to Launch Hero',
    Component: Welcome,
  },
} as const

async function getEmail<T extends keyof typeof emails>(key: T, props: ComponentProps<typeof emails[T]['Component']>) {
  if (!emails[key]) throw new Error(`No email found for key "${key}"`)

  const { createSubject, Component } = emails[key]
  const rawHtml = await render(<Component {...props as any} />)
  const html = await pretty(rawHtml)
  const text = toPlainText(rawHtml)

  return {
    // @ts-expect-error
    subject: createSubject(props as any),
    html,
    text,
  }
}

export default getEmail
