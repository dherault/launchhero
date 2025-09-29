import firebase from 'firebase-admin'
import type { Product } from 'launchhero-core'

async function upsertProduct(product: Product) {
  console.log('💽 Upserting Product', product.id)

  await firebase.firestore()
    .collection('products')
    .doc(product.id)
    .set(product, { merge: true })
}

export default upsertProduct
