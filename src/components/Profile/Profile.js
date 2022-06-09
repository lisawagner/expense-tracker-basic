import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import styles from './Profile.module.css'
import Remainder from './Remainder';
import Spent from './Spent';
import TotalBudget from './TotalBudget'

export default function Profile({ data }) {
  const { user } = useAuthContext()

  console.log('BUDGETS Data: ', data);
  return (
    <div>
      <h1>Expense Tracker for { user.displayName }</h1>
      <div className={styles.profileData}>
        {data.map((budget) => (
          <TotalBudget
            key={budget.id}
            id={budget.id}
            amount={budget.totalAmount}
            uid={budget.uid} />
        ))}  
        <Remainder />
        <Spent />
      </div>
    </div>
  )
}
