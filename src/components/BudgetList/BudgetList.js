import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
// components
import EditForm from '../EditForm/EditForm'
import Modal from '../Modal/Modal'

// styles
import styles from './BudgetList.module.css'

export default function BudgetList({ transactions }) {
  const [showModal, setShowModal] = useState(false)
  const [expense, setExpense] = useState([])
  
  const { deleteDocument } = useFirestore('transactions')

  const handleEdit = (docuData) => {
    setShowModal(!showModal)

    console.log("Handling edit for: ", docuData);
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
 
            <button className={styles.updateBtn} onClick={() => handleEdit(transaction.id)}>
                <MdModeEdit/>
            </button>
            {/* NEED TO MOVE MODAL INTO EDITFORM + CALL INDIVIDUALLY */}
            {showModal && (
            <Modal>
              {/* <EditForm transaction={transaction} /> */}
              <EditForm
                id={transaction.id}
                key={transaction.id}
                editName={transaction.name}
                editAmount={transaction.amount}
              />
              <button onClick={() => setShowModal(!showModal)}>X</button>
            </Modal>
            )}
          </li>
        ))}
      </ul>
    </div>
    
  )
}