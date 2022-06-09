import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import styles from './Profile.module.css'
import TotalBudget from './TotalBudget'

export default function Profile({ uid }) {
  const { user } = useAuthContext()
  // get specific users 'bugdets', send to totalbudget & remaining(for math)

  return (
    <div>
      <h1>Expense Tracker for { user.displayName }</h1>
      <div className={styles.profileData}>
        <div>
          <TotalBudget uid={user.uid} />
        </div>
        <div>Remaining</div>
        <div>Total Spent</div>
      </div>
    </div>
  )
}
