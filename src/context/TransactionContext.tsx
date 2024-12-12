import { createContext, ReactNode, useEffect, useState } from "react"

interface Transaction {
  id: number
  description: string
  type: "income" | "outcome"
  price: number
  category: string
  createdAt: string
}

interface TransactionContextType {
  transactions: Transaction[]
}

export interface TransactionProviderProps {
  children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransitions() {
    const response = await fetch("http://localhost:3000/transactions")
    const data = await response.json()
    setTransactions(data)
  }

  useEffect(() => {
    loadTransitions()
  }, [])
  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}