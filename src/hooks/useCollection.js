/*
 * Firestore Hook
 * fetch collection data from firestore
 * set listener for any runtime changes in that collection
 */
import {useState, useEffect, useRef} from 'react'
import { db } from '../firebase/config'
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore'

export const useCollection = (dataSource, _q, _sort) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // useRef to avoid infinite loop in useEffect
  // _q is an array and is "different" on each function call
  const dataQuery = useRef(_q).current
  const sortBy = useRef(_sort).current

  useEffect(() => {
    let collectionRef = collection(db, dataSource)

    if (dataQuery){
      collectionRef = query(collectionRef, where(...dataQuery))
    }
    if (sortBy) {
      // Note: create index on your Cloud Firestore collection
      // and wait... until status: complete
      collectionRef = query(collectionRef, orderBy(...sortBy))
    }

    // get documents and set listeners for realtime changes
    const unsub = onSnapshot(collectionRef, (snapshot) => {
      let results = []

      // map doc contents
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() })
      })
      
      // update state
      console.log('Result: ', results);

      setDocuments(results)

      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

    // clean up listeners on unmount
    return () => unsub()

  }, [dataSource, dataQuery, sortBy])

  return { documents, error }
}
