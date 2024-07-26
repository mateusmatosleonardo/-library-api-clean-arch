export type Isbn = {
  isbn: string
}

export type CreateLoan = {
  start_date: Date
  end_date: Date
  user_cpf: string
  books: Isbn[]
}
