# Development

## Root

Start by running `npm run install:all`.
The you will need to boot the frontend and the backend

## Frontend

### Prerequisites
You need to install firebase-tools: `npm i -g firebase-tools`.

### Developement
Then run `npm run dev` and `npm run emulators`

### App check
You may have to disable app check before you can use the emulators.

## Backend

### Prerequisites
You need to install [bun](https://bun.com) and the [Stripe CLI](https://docs.stripe.com/stripe-cli) to start developing.

### google-application-credentials.json
You need a `google-application-credentials.json` present in the backend directory.
It can generated following [this documentation](https://cloud.google.com/docs/authentication/application-default-credentials#GAC).

### Development
Run `npm run dev`
