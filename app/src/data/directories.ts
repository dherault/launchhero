import slugify from 'slugify'

import type { Directory } from '~types'

const directories = [
  {
    type: 'directory',
    name: 'Product Hunt',
    url: 'https://producthunt.com',
    tags: ['community'],
  },
  {
    type: 'directory',
    name: 'Hacker News',
    url: 'https://news.ycombinator.com',
    tags: ['community'],
  },
  {
    type: 'directory',
    name: 'BetaList',
    url: 'https://betalist.com',
    tags: [],
  },
  {
    type: 'directory',
    name: 'PitchWall',
    url: 'https://pitchwall.co',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Joinly',
    url: 'https://joinly.xyz',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Alternative To',
    url: 'https://alternativeto.net',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Stackshare',
    url: 'https://stackshare.io',
    tags: [],
  },
  {
    type: 'directory',
    name: 'F65',
    url: 'https://f6s.com',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Launched!',
    url: 'https://launched.io',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Robin Good\'s T5',
    url: 'https://tools.robingood.com',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Startup Buffer',
    url: 'https://startupbuffer.com',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Startup Inspire',
    url: 'https://startupinspire.com',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Startup Tracker',
    url: 'https://startuptracker.io',
    tags: [],
  },
  {
    type: 'directory',
    name: 'NextBigWhat',
    url: 'https://nextbigwhat.com',
    tags: [],
  },
].map(directory => ({
  id: slugify(directory.url.split('://')[1]),
  ...directory,
})) as Directory[]

export default directories
