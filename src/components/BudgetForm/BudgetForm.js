import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

// styles
import styles from './BudgetForm.module.css'

export default function BudgetForm({ uid }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const { addDocument, response } = useFirestore('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      uid,
      name, 
      amount,
    })
    addDocument({
      uid, 
      name, 
      amount,
    })

  }

  // Reset form
  useEffect(() => {
    if (response.success) {
      setName('')
      setAmount('')
    }
  }, [response.success])

  return (
    <div className={styles.budgetForm}>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Expense Name</span>
          <input 
            type="text"
            required
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </label>
        <label>
          <span>Amount ($)</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)} 
            value={amount} 
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </div>
  )
}


// const handleSubmit = async (e) => {
//   e.preventDefault()
//   console.log({
//     uid,
//     name, 
//     amount,
//   })
//   try {
//     await addDoc(collection(db, "transactions"), {
//       uid,
//       name,
//       amount,
//       created: Timestamp.now()
//     })
//   } catch (error) {
//     console.log(error);
//   }
// }