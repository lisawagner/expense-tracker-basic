import {useState, useEffect, useRef} from 'react'
import { db } from '../firebase/config'
import {
  doc,
  onSnapshot,
  // getDocs,
  // deleteDoc,
  // doc,
  // serverTimestamp,
  // Timestamp
} from 'firebase/firestore'

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    // let collectionRef = projectFirestore.collection(collection)
    const collectionRef = collection(db, "transactions")

    if (query) {
      collectionRef = collectionRef.where(...query)
    }
    if (orderBy) {
      collectionRef = collectionRef.orderBy(...orderBy)
    }

    const unsub = collectionRef.onSnapshot(snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        console.log(doc)
        results.push({...doc.data(), id: doc.id})
      });
      
      // update state
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

    // unsub on unmount
    return () => unsub()

  }, [collection, query, orderBy])

  return { documents, error }
}
