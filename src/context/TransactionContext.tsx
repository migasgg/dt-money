import { ReactNode, useEffect, useState } from "react"
import { api } from "../lib/axios"
import { createContext } from "use-context-selector"

interface Transaction {
  id: number
  description: string
  type: "income" | "outcome"
  price: number
  category: string
  createdAt: string
}

interface createTransactionsProps {
  description: string
  category: string
  price: number
  type: "income" | "outcome"
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransactions: (data: createTransactionsProps) => Promise<void>
}

export interface TransactionProviderProps {
  children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    })
    setTransactions(response.data)
  }

  async function createTransactions(data: createTransactionsProps) {
    const { description, category, price, type } = data
    const response = await api.post("transactions", {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    })
    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
