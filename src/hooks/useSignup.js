import { useState } from 'react'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'
import { useFirestore } from './useFirestore'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const { addDocument } = useFirestore('budgets')

  const signup = async ( email, password, displayName) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log("User Created:", res.user);
      // we now have a uid

      if (!res) {
        throw new Error('Could not complete signup. Please check your credentials and try again')
      }

      // add display name to user after successful registration
      // await res.user.updateProfile({ displayName })
      await updateProfile(res.user, {
        displayName
      })
      console.log('User profile updated for: ' + displayName);
      // create initial budget action
      addDocument({
        uid: res.user.uid,
        totalAmount: '0'
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })


      setIsPending(false)
      setError(null)
    } 
    catch(err) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  return { signup, error, isPending }
}