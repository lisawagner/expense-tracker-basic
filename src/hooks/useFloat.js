import { useState } from "react"
// TODO - refactor, test and implement

export const useFloat = (e) => {
  const [currency, setCurrency] = useState(null)
  const { value } = e.target

  if (value.match(/\./g)) {
    const [, decimal] = value.split('.')

    if (decimal?.length > 2) {
      return
    }
  }
  setCurrency(value)
  return currency
}