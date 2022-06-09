// components
import BudgetItem from './BudgetItem';

// styles
import styles from './BudgetList.module.css'

export default function BudgetList({ transactions, uid }) {


  return (
    <div className={styles.transactions}>
      <h2>Expenses</h2>
      <div className={styles.transactionsList}>
        {transactions.map((transaction) => (
          <BudgetItem
            key={transaction.id}
            id={transaction.id}
            name={transaction.name}
            amount={transaction.amount}
            uid={uid}
          />
        ))}
      </div>
    </div>
  )
}