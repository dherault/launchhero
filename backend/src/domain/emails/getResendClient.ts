import { Resend } from 'resend'

import { SECRET_RESEND_API_KEY } from '~constants'

import retrieveSecret from '~utils/retrieveSecret'

async function getResendClient() {
  const resendApiKey = await retrieveSecret(SECRET_RESEND_API_KEY)

  return new Resend(resendApiKey)
}

export default getResendClient
