import firebase from 'firebase-admin'
import type { Price } from 'launchhero-core'

async function upsertPrice(productId: string, price: Price) {
  console.log('💽 Upserting Price', price.id)

  await firebase.firestore()
    .collection(`products/${productId}/prices`)
    .doc(price.id)
    .set(price, { merge: true })
}

export default upsertPrice
