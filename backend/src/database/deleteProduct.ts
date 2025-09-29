import firebase from 'firebase-admin'

async function deleteProduct(productId: string) {
  console.log('💽 Deleting Product', productId)

  await firebase.firestore()
    .collection('products')
    .doc(productId)
    .delete()
}

export default deleteProduct
