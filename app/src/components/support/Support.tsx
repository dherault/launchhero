import { DateTime } from 'luxon'

import { SUPPORT_EMAIL, SUPPORT_FULL_NAME, SUPPORT_METING_URL } from '~constants'

import useLogAnalytics from '~hooks/analytics/useLogAnalytics'

import { Button } from '~components/ui/Button'

function Support() {
  useLogAnalytics('view_support')

  return (
    <div className="mx-auto pb-8 px-4 grow container text-center flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">
        Support
      </h1>
      <div className="mt-4">
        For any inquiry, please contact:
      </div>
      <div className="mt-4 font-semibold text-lg">
        {SUPPORT_FULL_NAME}
      </div>
      <img
        src="/images/david-herault-whatsapp-picture.png"
        className="mt-4 rounded-full w-32 h-32"
        alt={SUPPORT_FULL_NAME}
      />
      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="mt-4 text-primary hover:underline"
      >
        {SUPPORT_EMAIL}
      </a>
      <a
        href={SUPPORT_METING_URL}
        target="_blank"
        className="mt-4 text-primary hover:underline"
        rel="noreferrer"
      >
        <Button>
          Book a meeting
        </Button>
      </a>
      <div className="mt-4">
        Or via WhatsApp:
      </div>
      <img
        src="/images/david-herault-whatsapp-qrcode.png"
        className="mt-2 w-64 h-64"
        alt="David Herault WhatsApp QR Code"
      />
      <div className="mt-8">
        Current time in Finland:
        {' '}
        {DateTime.now().setZone('Europe/Helsinki').toLocaleString(DateTime.TIME_SIMPLE)}
      </div>
    </div>
  )
}

export default Support
