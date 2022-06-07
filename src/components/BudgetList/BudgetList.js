import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
// components
import EditForm from '../EditForm/EditForm'

// styles
import styles from './BudgetList.module.css'

export default function BudgetList({ transactions }) {
  const [open, setOpen] = useState({ edit:false, view:false })
  
  const { deleteDocument } = useFirestore('transactions')
  console.log('TRANSACTIONS: ', transactions);

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  const handleEdit = (docuData) => {
    setOpen({...open, view: true})
    console.log("Handling edit for: ", docuData, open);
  }

  return (
    <div className={styles.transactions}>
      <h2>Expenses</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p className={styles.name}>{transaction.name}</p>
            <p className={styles.amount}>${transaction.amount}</p>
            <button className={styles.deleteBtn} onClick={() => deleteDocument(transaction.id)}><MdDeleteForever/></button>
            <button className={styles.updateBtn} onClick={() => handleEdit(transaction)}>
                <MdModeEdit/>
            </button>
          </li>
        ))}
      </ul>
      {open.edit &&
        <EditForm />
      }
    </div>
  )
}