import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import styles from './Signup.module.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signup, isPending, error} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(email, password, displayName)
    signup(email, password, displayName)
  }

  return (
    <div className={styles.signupWrap}>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label>
          <span>Email:</span>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            autoComplete='on'
          />
        </label>
        <label>
          <span>Password:</span>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
            autoComplete='on'
          />
        </label>
        <label>
          <span>Display Name:</span>
          <input 
            type="text" 
            onChange={(e) => setDisplayName(e.target.value)} 
            value={displayName}
            autoComplete='on'
          />
        </label>
        {!isPending && <button className="btn">Signup</button>}
        {isPending && <button className="btn" disabled>loading</button>}
        {error && <p className={styles.errorMsg}>{error}</p>}
      </form>
    </div>
  )
}
