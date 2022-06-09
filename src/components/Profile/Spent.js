import styles from './Spent.module.css'

export default function Spent() {
  return (
    <div className={styles.spentContainer}>
      <div className={styles.spentContent}>SPENT: $0.00</div>
    </div>
  )
}
