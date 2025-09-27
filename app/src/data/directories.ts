import slugify from 'slugify'

import type { Directory } from '~types'

const directories = [
  {
    type: 'directory',
    name: 'Product Hunt',
    url: 'https://producthunt.com',
    imageUrl: '/images/directories/product-hunt.png',
    tags: ['community'],
  },
  {
    type: 'directory',
    name: 'Hacker News',
    url: 'https://news.ycombinator.com',
    imageUrl: '/images/directories/hacker-news.png',
    tags: ['community'],
  },
  {
    type: 'directory',
    name: 'BetaList',
    url: 'https://betalist.com',
    imageUrl: '/images/directories/betalist.png',
    tags: [],
  },
  {
    type: 'directory',
    name: 'PitchWall',
    url: 'https://pitchwall.co',
    imageUrl: '/images/directories/pitchwall.png',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Joinly',
    url: 'https://joinly.xyz',
    imageUrl: '/images/directories/joinly.png',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Alternative To',
    url: 'https://alternativeto.net',
    imageUrl: '/images/directories/alternative-to.png',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Stackshare',
    url: 'https://stackshare.io',
    imageUrl: '/images/directories/stackshare.png',
    tags: [],
  },
  {
    type: 'directory',
    name: 'F65',
    url: 'https://f6s.com',
    imageUrl: '/images/directories/f65.png',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Launched!',
    url: 'https://launched.io',
    imageUrl: '/images/directories/launched.png',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Robin Good\'s T5',
    url: 'https://tools.robingood.com',
    imageUrl: null,
    tags: [],
  },
  {
    type: 'directory',
    name: 'Startup Buffer',
    url: 'https://startupbuffer.com',
    imageUrl: '/images/directories/startup-buffer.png',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Startup Inspire',
    url: 'https://startupinspire.com',
    imageUrl: '/images/directories/startup-inspire.png',
    tags: [],
  },
  {
    type: 'directory',
    name: 'Startup Tracker',
    url: 'https://startuptracker.io',
    imageUrl: '/images/directories/startup-tracker.png',
    tags: [],
  },
  {
    type: 'directory',
    name: 'NextBigWhat',
    url: 'https://nextbigwhat.com',
    imageUrl: '/images/directories/next-big-what.png',
    tags: [],
  },
].map(directory => ({
  id: slugify(directory.url.split('://')[1]),
  ...directory,
})) as Directory[]

export default directories
