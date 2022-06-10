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
    <div className={styles.addBudget}>
      <h2>Update Budget</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.addInput}>
          {/* <span>New Budget</span> */}
          <label>
            <span>New Budget</span>
            <input
              type="number"
              onChange={handleFloat}
              value={totalAmount}
            />
          </label>
          <button>Update</button>
        </div>
      </form>
    </div>
  )
}
