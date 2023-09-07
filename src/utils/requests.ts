// import { clearCacheByEndpoint }  from "src/hooks/useCustomFetch"

import mockData from "../mock-data.json"
import { PaginatedRequestParams, PaginatedResponse, Transaction } from "../utils/types"
import { Employee, RequestByEmployeeParams, SetTransactionApprovalParams } from "./types"
// import { clearCacheByEndpoint } from "./src/hooks/useCustomFetch"

const TRANSACTIONS_PER_PAGE = 5
const data: { employees: Employee[]; transactions: Transaction[] } = {
  employees: mockData.employees,
  transactions: mockData.transactions,
}

export const getEmployees = (): Employee[] => data.employees

export const getTransactionsPaginated = ({
  page,
}: PaginatedRequestParams): PaginatedResponse<Transaction[]> => {
  if (page === null) {
    throw new Error("Page cannot be null")
  }

  const start = page * TRANSACTIONS_PER_PAGE
  const end = start + TRANSACTIONS_PER_PAGE

  if (start > data.transactions.length) {
    throw new Error(`Invalid page ${page}`)
  }

  const nextPage = end < data.transactions.length ? page + 1 : null

  return {
    nextPage,
    data: data.transactions.slice(start, end),
  }
}

export const getTransactionsByEmployee = ({ employeeId }: RequestByEmployeeParams) => {
  if (!employeeId) {
    throw new Error("Employee id cannot be empty")
  }

  return data.transactions.filter((transaction) => transaction.employee.id === employeeId)
}

export const setTransactionApproval = async ({
  transactionId,
  value,
}: SetTransactionApprovalParams): Promise<void> => {
  const transaction = data.transactions.find(
    (currentTransaction) => currentTransaction.id === transactionId
  )

  if (!transaction) {
    throw new Error("Invalid transaction to approve")
  }
  // const { clearCacheByEndpoint } = useCustomFetch()
  // const endpointsToClear: RegisteredEndpoints[] = ["setTransactionApproval"]

  // clearCacheByEndpoint(endpointsToClear)

  transaction.approved = value
}
