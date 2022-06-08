import { useState, useEffect } from 'react'
// firebase
import { db } from '../../firebase/config'
import { collection, onSnapshot, doc, getDoc, where, query, getDocs, docs  } from 'firebase/firestore'

export default function TotalBudget({ uid }) {

  return (
    <div>
      <h3>Budget: 0</h3>
      <button>Edit</button>
    </div>
  )
}
