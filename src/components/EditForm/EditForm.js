import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore'

// styles
import styles from './EditForm.module.css'

export default function EditForm({id, editName, editAmount, uid, onClose}) {
  const [name, setName] = useState(editName)
  const [amount, setAmount] = useState(editAmount)

  const { editDocument, response } = useFirestore('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newData = {
      name,
      amount
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
    setAmount(value)
  }

  const handleNum = (e) => {
    const { value } = e.target

    if (value < 0) {
      setAmount(value * -1 )
    }
    if (value === '0') {
      setAmount('')
    }
  }

  // Reset
  useEffect(() => {
    if (response.success) {
      setName('')
      setAmount('')
      onClose()
    }
  }, [response.success, onClose])

  return (
    <div className={styles.editForm}>
      <h2>Edit Transaction</h2>
      
      <form onSubmit={handleSubmit} >
        <label>
          <span>Change Transaction Name</span>
          <input 
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </label>
        <label>
          <span>Change Amount</span>
          <input
            type="number"
            onChange={handleFloat}
            required
            value={amount}
            name="amount"
            max="9999999"
            onKeyUp={handleNum}
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  )
}
