// styles
import styles from './Budget.module.css'

// components
import TransactionForm from './TransactionForm'

export default function Budget() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        transaction list
      </div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  )
}
