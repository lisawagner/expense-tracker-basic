import { useReducer, useEffect, useState } from "react"
import { db } from '../firebase/config'
import {
  addDoc,
  collection,
  Timestamp
} from 'firebase/firestore'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      console.log("is pending ...");
      return {success: false, isPending: true, error: null, document: null}
    case "ERROR":
      return {success: false, isPending: false, error: action.payload, document: null}
    case "ADDED_DOCUMENT":
      console.log('Added Doc!!!!!!!!!!!!!!!!!!');
      return {success: true, isPending: false, error: null, document: action.payload}
    default:
      return state
  }
}

const transactionRef = collection(db, "transactions")

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // only dispatch if not cancelled
  // const dispatchIfNotCancelled = (action) => {
  //   if (!isCancelled) {
  //     dispatch(action)
  //   }
  // }
  
  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" })

    // only dispatch if not cancelled


    try {
      const createdAt = Timestamp.now()
      const addDocument = await addDoc(transactionRef, {...doc, createdAt})
      // dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addDocument })
      if (!isCancelled) {
        dispatch({ type: "ADDED_DOCUMENT", payload: addDocument })
      }
    }
    catch (err) {
      // dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
      dispatch({ type: "ERROR", payload: err.message })
    }

  }

  // delete a document
  const deleteDocument = async (doc) => {

  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }

}