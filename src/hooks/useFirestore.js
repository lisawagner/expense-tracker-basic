import { useReducer, useEffect, useState } from "react"
import { db } from '../firebase/config'
import {
  addDoc,
  collection,
  Timestamp,
  doc,
  deleteDoc,
  updateDoc
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
      // console.log("IS_PENDING");
      return {success: false, isPending: true, error: null, document: null}
    case "ADDED_DOCUMENT":
      // console.log('Added Doc!!!!!!!!!!!!!!!!!!');
      return {success: true, isPending: false, error: null, document: action.payload}
    case "UPDATED_DOCUMENT":
      // console.log("Updated? ...");
      return {success: true, isPending: false, error: null, document: action.payload}
    case 'DELETED_DOCUMENT':
      return { success: true, isPending: false, error: null, document: null }
    case "ERROR":
      return {success: false, isPending: false, error: action.payload, document: null}
    default:
      return state
  }
}

export const useFirestore = (dataSource) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)
  
  const transactionRef = collection(db, dataSource)

  // add a document
  const addDocument = async (docs) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const createdAt = Timestamp.now()
      const addedDocument = await addDoc(transactionRef, {...docs, createdAt})
      if (!isCancelled) {
        dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument })
      }
    }
    catch (err) {
      dispatch({ type: "ERROR", payload: err.message })
    }

  }

  // edit a document
  const editDocument = async(itemId, value) => {
    dispatch({ type: "IS_PENDING" })
    // console.log("ID: ", itemId);
    // console.log("Data: ", value);
    try {
      const editRef = doc(db, dataSource, itemId)
      const editedDocument = await updateDoc(editRef, value)
      dispatch({ type: "UPDATED_DOCUMENT", payload: editedDocument})
    } catch (error) {
      dispatch({ type: "ERROR", payload: 'could not edit' })
    }

  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const docRef = doc(db, dataSource, id)
      await deleteDoc(docRef)
      dispatch({ type: "DELETED_DOCUMENT"})
    } catch (error) {
      dispatch({ type: "ERROR", payload: 'could not delete' })
    }

  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, editDocument, response }

}