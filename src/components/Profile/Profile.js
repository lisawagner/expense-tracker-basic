import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import styles from './Profile.module.css'
import Remainder from './Remainder';
import Spent from './Spent';
import TotalBudget from './TotalBudget'

export default function Profile({ income, expenses }) {
  const { user } = useAuthContext()
  const [sum, setSum] = useState('0.00')
  const [totalFunds, setTotalFunds] = useState("0")

  console.log('BUDGETS Data: ', income);
  console.log('EXPENSES Data: ', expenses);

  useEffect(() => {
    let temp = 0
    for(let i = 0; i < income.length; i++) {
      temp += parseFloat(income[i].totalAmount)
    }
    console.log("Temp: ", temp)
   
    setTotalFunds(temp)
  }, [income])

  console.log("setTotalFunds: ", {totalFunds});

  useEffect(() => {
    
    if (expenses !== null) {
      let temp = 0
      for(let i = 0; i < expenses.length; i++) {
        temp += parseFloat(expenses[i].amount)
      }

      setSum(temp) 
    }

  }, [expenses])

  // const sum = expenses
  //   .map( (datum) => parseFloat(datum.amount) )
  //   .reduce( (a, b) => a + b )

  // const totalFunds = income
  //   .map( (datum) => parseFloat(datum.totalAmount) )
  //   .reduce( (a,b) => a + b )

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
            uid={budget.uid}
            /> 
        ))}  
        <Remainder data={remainder} />
        <Spent data={sum} />
      </div>
    </div>
  )
}
