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
  const { documents, error } = useCollection(
    'transactions',
    ["uid", "==", user.uid],
    ['createdAt', 'desc']
  )

  return (
    <>
      <div className={styles.profileContainer}>
        <Profile uid={user.uid} />
      </div>
      <div className={styles.expenseContainer}>

        <div className={styles.content}>
          {error && <p>{error}</p>}
          {documents && <BudgetList transactions={documents} uid={user.uid} />}
        </div>
        <div className={styles.sidebar}>
          <BudgetForm uid={user.uid}/>
        </div>
      </div>
    </>
  )
}
