import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore'

// styles
import styles from './AddBudget.module.css'

export default function AddBudget({id, editAmount, uid, onClose}) {
  const [totalAmount, setTotalAmount] = useState(editAmount)

  const { editDocument, response } = useFirestore('budgets')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newData = {
      totalAmount
    }
    editDocument(id, newData)
  }

  const handleFloat = (e) => {
    const { value } = e.target

    if (value.match(/\./g)) {
      const [, decimal] = value.split('.')

      if (decimal?.length > 2) {
        return
      }
    }
    setTotalAmount(value)
  }

  // Reset
  useEffect(() => {
    if (response.success) {
      setTotalAmount('')
      onClose()
    }
  }, [response.success, onClose])

  return (
    <div className={styles.addBudgetWrap}>
      <h2>Update Budget</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Change Budget Amount</span>
          <input
            type="number"
            onChange={handleFloat}
            value={totalAmount}
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  )
}
