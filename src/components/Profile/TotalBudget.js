import { useState } from 'react'
import { useDocument } from '../../hooks/useDocument'
// NOTE: Budget initialized during signup via useSignup hook

// components
import Modal from '../Modal/Modal'
import AddBudget from './AddBudget'

// styles
import styles from './TotalBudget.module.css'

export default function TotalBudget({ id, amount, uid }) {
  const [showModal, setShowModal] = useState(false)
  
  const handleEdit = (id) => {
    setShowModal(!showModal)
    console.log("Handling edit for: ", id);
  }

  const handleClose = () => {
    setShowModal(!showModal)
  }

  return (
    <div className={styles.totalContainer}>
      <div className={styles.content}>
        <p>BUDGET: ${amount}</p>
        <button onClick={() => handleEdit(id)}>EDIT</button>
      </div>
      {showModal && (
        <Modal>
        <button className={styles.closeBtn} onClick={() => setShowModal(!showModal)}>XXX</button>
          <AddBudget
            key={id}
            id={id}
            editAmount={amount}
            uid={uid}
            onClose={handleClose}
          />
        </Modal>
        
        )}
    </div>
  )
}

