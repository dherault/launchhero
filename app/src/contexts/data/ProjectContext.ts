import { createContext } from 'react'

import type { Project } from '~types'

export default createContext<Project | null>(null)
