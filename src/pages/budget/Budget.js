import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

// styles
import styles from './Budget.module.css'

// components
import Profile from '../../components/Profile/Profile'
import BudgetForm from '../../components/BudgetForm/BudgetForm'
import BudgetList from '../../components/BudgetList/BudgetList'

export default function Budget() {
  const { user } = useAuthContext()
  const { documents: transactions, error: transError } = useCollection(
    'transactions',
    ["uid", "==", user.uid],
    ['createdAt', 'desc']
  )
  const { documents: budgets, error: budgetError } = useCollection(
    'budgets',
    ["uid", "==", user.uid],
    ['createdAt', 'desc']
  )
  // console.log('DOCS:', transactions);
  // console.log('BUDGETS: ', budgets);

  return (
    <>
      <div className={styles.profileContainer}>
        {budgetError && <p>{budgetError}</p>}
        {budgets && <Profile income={budgets} expenses={transactions} />}
      </div>
      <div className={styles.expenseContainer}>

        <div className={styles.content}>
          {transError && <p>{transError}</p>}
          {transactions && <BudgetList transactions={transactions} uid={user.uid} />}
        </div>
        <div className={styles.sidebar}>
          <BudgetForm uid={user.uid}/>
        </div>
      </div>
    </>
  )
}
