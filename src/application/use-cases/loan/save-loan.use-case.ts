import { LoanRepository } from "@/application/interfaces/loan/loan-repository.interface"
import { CreateLoan } from "@/application/dto/loan/create-loan.dto"
import { Loan } from "@/application/dto/loan/loan.dto"

type Input = CreateLoan & {}

type Output = Loan & {}

export class SaveLoanUseCase {
  constructor(private readonly loanRepository: LoanRepository) {}

  async execute(input: Input): Promise<Output> {
    return this.loanRepository.save(input)
  }
}
