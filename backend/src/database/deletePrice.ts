import firebase from 'firebase-admin'

async function deletePrice(productId: string, priceId: string) {
  console.log('💽 Deleting Price', priceId)

  await firebase.firestore()
    .collection(`products/${productId}/prices`)
    .doc(priceId)
    .delete()
}

export default deletePrice
