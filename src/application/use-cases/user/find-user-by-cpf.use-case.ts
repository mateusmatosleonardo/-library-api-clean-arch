import { UserRepository } from "@/application/interfaces/user/user-repository.interface";
import { Loan } from "@/application/dto/loan/loan.dto";

type Output = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  loan?: Loan | null;
};

export class FindUserByCpfUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(cpf: string): Promise<Output | null> {
    return this.userRepository.findByCpf(cpf);
  }
}
