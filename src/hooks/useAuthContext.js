import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
  // consume the context
  const context = useContext(AuthContext)

  // for development - use case for: just wrapping a subtree of components
  if(!context) {
    throw new Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}