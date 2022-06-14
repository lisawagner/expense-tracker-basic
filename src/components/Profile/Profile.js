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


  useEffect(() => {
    let tempIncome = 0
    for(let i = 0; i < income.length; i++) {
      tempIncome += parseFloat(income[i].totalAmount)
    }
    setTotalFunds(tempIncome)

    if (expenses !== null) {
      let tempNum = 0
      for(let i = 0; i < expenses.length; i++) {
        tempNum += parseFloat(expenses[i].amount)
      }
      let newSum = parseFloat(tempNum).toFixed(2)
      setSum(newSum)
    }

  }, [income, expenses])

  // useEffect(() => {
    
  //   if (expenses !== null) {
  //     let tempNum = 0
  //     for(let i = 0; i < expenses.length; i++) {
  //       tempNum += parseFloat(expenses[i].amount)
  //     }
  //     let newSum = parseFloat(tempNum).toFixed(2)
  //     setSum(newSum)
  //   }

  // }, [expenses])

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
