import { useState, useEffect } from 'react'
// firebase
import { db } from '../../firebase/config'
import { collection, onSnapshot, doc, getDoc, where, query, getDocs, docs  } from 'firebase/firestore'
import { useDocument } from '../../hooks/useDocument'

export default function TotalBudget({ uid }) {
  const { userDoc, error } = useDocument(
    'budgets',
    'O6Oo9Axoeg5uNhUBzxCc',
  )

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!userDoc) {
    return <div className="loading">Loading...</div>
  }
  
  // console.log(userDoc);


  return (
    <div>
      <h3>Budget: {userDoc.totalAmount}</h3>
      <button>Edit</button>
    </div>
  )
}
