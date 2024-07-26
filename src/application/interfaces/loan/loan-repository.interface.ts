import { CreateLoan } from "@/application/dto/loan/create-loan.dto"
import { Loan } from "@/application/dto/loan/loan.dto"

export interface LoanRepository {
  save(loan: CreateLoan): Promise<Loan>
}
