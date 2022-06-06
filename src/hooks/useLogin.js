import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
  
    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password)

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

    } 
    catch(err) {
      setError(err.message)
    }
  }

  return { login, error }
}
