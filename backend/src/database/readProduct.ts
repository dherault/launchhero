import firebase from 'firebase-admin'
import type { Product } from 'launchhero-core'

async function readProduct(productId: string): Promise<Product | null> {
  const snapshot = await firebase.firestore()
    .collection('products')
    .doc(productId)
    .get()

  return (snapshot.data() as Product) ?? null
}

export default readProduct
