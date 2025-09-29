import firebase from 'firebase-admin'
import type { Price } from 'launchhero-core'

async function readPrice(productId: string, priceId: string): Promise<Price | null> {
  const snapshot = await firebase.firestore()
    .collection(`products/${productId}/prices`)
    .doc(priceId)
    .get()

  return (snapshot.data() as Price) ?? null
}

export default readPrice
