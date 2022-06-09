import { useEffect, useState, useReducer } from "react"
// firebase
import { db } from '../firebase/config'
import { onSnapshot, doc, getDoc  } from 'firebase/firestore'

// let initialState = {
//   document: null,
//   isPending: false,
//   error: null,
//   success: null,
// }

// const budgetReducer = (state, action) => {
//   switch (action.type) {
//     case "IS_PENDING":
//       console.log("BUDGET_PENDING");
//       return {success: false, isPending: true, error: null, document: null}
//     case "SET_BUDGET":
//       console.log('Inital Budget Set');
//       return {success: true, isPending: false, error: null, document: action.payload}
//     case "ERROR":
//       return {success: false, isPending: false, error: action.payload, document: null}
//     default:
//       return state;
//   }
// }

export const useDocument = (collection, id) => {
  // const [response, dispatch] = useReducer(budgetReducer, initialState)
  const [userDoc, setUserDoc] = useState(null)
  const [error, setError] = useState(null)

  // realtime document data
  useEffect(() => {
    // const docRef = db.collection(collection).doc(id)
    const docRef = doc(db, collection, id)
    // const snapshot = getDoc(docRef)

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      // need to make sure the doc exists & has data
      if(snapshot.exists) {
        setUserDoc({...snapshot.data(), id: snapshot.id})
        setError(null)
      }
      else {
        setError('No such document exists')
      }
    }, err => {
      console.log(err.message)
      setError('failed to get document')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collection, id])

  return { userDoc, error }
}