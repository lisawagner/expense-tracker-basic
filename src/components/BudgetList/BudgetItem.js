import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';

import EditForm from '../EditForm/EditForm'
import Modal from '../Modal/Modal'

// styles
import styles from './BudgetList.module.css'

export default function BudgetItem({ id, name, amount, uid }) {
  const [showModal, setShowModal] = useState(false)
  const { deleteDocument } = useFirestore('transactions')

  const handleEdit = (docuData) => {
    setShowModal(!showModal)
    console.log("Handling edit for: ", docuData, uid);
  }

  const handleClose = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <div className={styles.item} key={id}>
        <p className={styles.name}>{name}</p>
        <p className={styles.amount}>${amount}</p>
        <button className={styles.deleteBtn} onClick={() => deleteDocument(id)}><MdDeleteForever/></button>
        <button className={styles.updateBtn} onClick={() => handleEdit(id)}>
            <MdModeEdit/>
        </button>
      </div>
      {showModal && (
        <Modal>
        <button className={styles.closeBtn} onClick={() => setShowModal(!showModal)}>X</button>
          <EditForm
            id={id}
            key={id}
            editName={name}
            editAmount={amount}
            uid={uid}
            onClose={handleClose}
          />
        </Modal>
        )}
    </>
  )
}
