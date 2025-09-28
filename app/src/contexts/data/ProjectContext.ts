import type { Project } from 'launchhero-core'
import { createContext } from 'react'

export default createContext<Project | null>(null)
