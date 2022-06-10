import styles from './Spent.module.css'

export default function Spent({data}) {
  // const sum = data.map( (datum) => parseFloat(datum.amount) ).reduce( (a, b) => a + b )

  return (
    <div className={styles.spentContainer}>
      <div className={styles.spentContent}>SPENT: ${data}</div>
    </div>
  )
}
