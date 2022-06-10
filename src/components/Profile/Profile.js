import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import styles from './Profile.module.css'
import Remainder from './Remainder';
import Spent from './Spent';
import TotalBudget from './TotalBudget'

export default function Profile({ income, expenses }) {
  const { user } = useAuthContext()

  console.log('BUDGETS Data: ', income);
  console.log('EXPENSES Data: ', expenses);

  const sum = expenses
    .map( (datum) => parseFloat(datum.amount) )
    .reduce( (a, b) => a + b )

  const totalFunds = income
    .map( (datum) => parseFloat(datum.totalAmount) )
    .reduce( (a,b) => a + b )

  const remainder = parseFloat(totalFunds - sum).toFixed(2)

  return (
    <div>
      <h1>Expense Tracker for { user.displayName }</h1>
      <div className={styles.profileData}>
        {income.map((budget) => (
          <TotalBudget
            key={budget.id}
            id={budget.id}
            amount={budget.totalAmount}
            uid={budget.uid} /> 
        ))}  
        <Remainder data={remainder} />
        <Spent data={sum} />
      </div>
    </div>
  )
}
