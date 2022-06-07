import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';

// styles
import styles from './Budget.module.css'

export default function TransactionList({ transactions }) {
  
  const { deleteDocument } = useFirestore('transactions')
  console.log('TRANSACTIONS: ', transactions);

  const handleEdit = (docuData) => {
    console.log("Handling edit for: ", docuData);
  }

  return (
 
      <ul className={styles.transactions}>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p className={styles.name}>{transaction.name}</p>
            <p className={styles.amount}>${transaction.amount}</p>
            <button className={styles.deleteBtn} onClick={() => deleteDocument(transaction.id)}><MdDeleteForever/></button>
            <button className={styles.updateBtn} onClick={() => handleEdit(transaction)}><MdModeEdit/></button>
          </li>
        ))}
      </ul>

  )
}