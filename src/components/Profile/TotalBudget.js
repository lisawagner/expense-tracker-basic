import { useState, useEffect } from 'react'
// firebase
import { db } from '../../firebase/config'
import { collection, onSnapshot, doc, getDoc, where, query, getDocs, docs  } from 'firebase/firestore'

export default function TotalBudget({ uid }) {
  const [userDoc, setUserDoc] = useState(null)

  const Read = () => {
    const myDoc = doc(db, 'budgets', 'O6Oo9Axoeg5uNhUBzxCc')

    getDoc(myDoc)
      // handle promises
      .then((snapshot) => {
        // Successs
        if (snapshot.exists) {
          setUserDoc(snapshot.data())
        } else {
          console.log('No Doc Found');
        }
      })
      .catch((error) => {
        // Failure
        console.log(error.message);
      })
  }

  // Read() <-- works but never stops, lol
  console.log(userDoc);
  return (
    <div>
      <h3>Budget: 0</h3>
      <button>Edit</button>
    </div>
  )
}
