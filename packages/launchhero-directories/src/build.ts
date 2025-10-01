import fs from 'node:fs'
import path from 'node:path'

import directories from './directories'

const directoriesJson = JSON.stringify(directories, null, 2)
const directoriesType = `import type { Directory } from 'launchhero-core'
declare const directories: Directory[]
export default directories
`

fs.writeFileSync(path.join(import.meta.dirname, '../dist/directories.json'), directoriesJson)
fs.writeFileSync(path.join(import.meta.dirname, '../dist/directories.d.ts'), directoriesType)

console.log(`⚡️ Done: ${directories.length} directories`)
