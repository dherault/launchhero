import fs from 'node:fs'
import path from 'node:path'

import descriptions from './descriptions.json'
import directories from './directories'
import domainAuthorities from './domain-authorities.json'
import fetchDescription from './fetchDescription'
import fetchDomainAuthority from './fetchDomainAuthority'

// Find duplicate urls
const urls = directories.map(d => new URL(d.url).hostname)
const dedupedUrls = new Set(urls)

if (dedupedUrls.size !== directories.length) {
  console.error('❌ Duplicate URLs found in directories:', urls.filter((url, index) => urls.indexOf(url) !== index))
  process.exit(1)
}

for (const directory of directories) {
  directory.domainAuthority = domainAuthorities[directory.id as keyof typeof domainAuthorities] ?? await fetchDomainAuthority(directory.url)
  directory.description = descriptions[directory.id as keyof typeof descriptions] || await fetchDescription(directory.url)

  console.log('📘', directory.name, directory.domainAuthority, directory.description)
}

directories.sort((a, b) => b.domainAuthority - a.domainAuthority)
const directoriesJson = JSON.stringify(directories, null, 2)
const directoriesType = `import type { Directory } from 'launchhero-core'
declare const directories: Directory[]
export default directories
`
const domainAuthorityJson = JSON.stringify(Object.fromEntries(directories.map(d => [d.id, d.domainAuthority])), null, 2)
const descriptionsJson = JSON.stringify(Object.fromEntries(directories.map(d => [d.id, d.description])), null, 2)

fs.writeFileSync(path.join(import.meta.dirname, '../dist/directories.json'), directoriesJson)
fs.writeFileSync(path.join(import.meta.dirname, '../dist/directories.d.ts'), directoriesType)
fs.writeFileSync(path.join(import.meta.dirname, './domain-authorities.json'), domainAuthorityJson)
fs.writeFileSync(path.join(import.meta.dirname, './descriptions.json'), descriptionsJson)

console.log(`⚡️ Done: ${directories.length} directories`)
