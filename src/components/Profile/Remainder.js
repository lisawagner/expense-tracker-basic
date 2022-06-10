import styles from './Remainder.module.css'

export default function Remainder({data}) {
  return (
    <div className={styles.remainContainer}>
      <div className={styles.remainContent}>REMAINDER: ${data}</div>
    </div>
  )
}
