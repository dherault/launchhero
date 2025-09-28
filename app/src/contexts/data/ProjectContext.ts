import { createContext } from 'react'
import type { Project } from 'submithero-core'

export default createContext<Project | null>(null)
