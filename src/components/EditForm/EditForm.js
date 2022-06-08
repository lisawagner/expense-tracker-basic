import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore'

// styles
import styles from './EditForm.module.css'

export default function EditForm({id, editName, editAmount}) {
  const [name, setName] = useState(editName)
  const [amount, setAmount] = useState(editAmount)

  const { editDocument, response } = useFirestore('transactions')
  console.log("From EditForm: ", id);

  const handleSubmit = (e) => {
    e.preventDefault()
    const newData = {
      name,
      amount
    }
    console.log(id, {
      name, 
      amount,
    })
    editDocument(id, newData)
  }

    // Reset form
    useEffect(() => {

      if (response.success) {
        setName('')
        setAmount('')
        // close modal

      }
    }, [response.success])

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
            onChange={(e) => setAmount(e.target.value)} 
            value={amount} 
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  )
}
