import { setGlobalOptions } from 'firebase-functions'

setGlobalOptions({ maxInstances: 12 })

export { default as isProjectExisting } from '~routes/isProjectExisting'
