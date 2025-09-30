import fs from 'node:fs'
import path from 'node:path'

import type { Directory } from 'launchhero-core'
import slugify from 'slugify'

import createDirectoryDescription from './createDirectoryDescription'
import directoriesDescriptions from './directories-descriptions.json'
import directoriesInput from './directories-input'

type Descriptions = Record<string, string>

const directories = await Promise.all<Directory>(
  directoriesInput.map(async directoryInput => {
    const id = slugify(directoryInput.url.split('://')[1])
    const description = (directoriesDescriptions as Descriptions)[id] ?? await createDirectoryDescription(directoryInput)

    console.log('📘', directoryInput.name)

    return {
      id,
      description,
      ...directoryInput,
    }
  }),
)

const descriptions = directories.reduce(
  (acc, directory) => ({ ...acc, [directory.id]: directory.description }),
  {} as Descriptions,
)
const descriptionsJson = JSON.stringify(descriptions, null, 2)
const directoriesJson = JSON.stringify(directories, null, 2)

fs.writeFileSync(path.join(import.meta.dirname, 'directories-descriptions.json'), descriptionsJson)
fs.mkdirSync(path.join(import.meta.dirname, '../dist'))
fs.writeFileSync(path.join(import.meta.dirname, '../dist/directories.json'), directoriesJson)

console.log(`⚡️ Done: ${directories.length} directories`)
