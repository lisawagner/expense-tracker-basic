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
    addDocument({
      uid, 
      name, 
      amount,
    })
  }

  const handleFloat = (e) => {
    const { value } = e.target

    if (value.match(/\./g)) {
      const [, decimal] = value.split('.')

      if (decimal?.length > 2) {
        return
      }
    }
    setAmount(value)
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
          <span>Amount ($0.00)</span>
          <input
            type="number"
            required
            // onChange={(e) => setAmount(e.target.value)}
            onChange={handleFloat}
            value={amount}
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </div>
  )
}