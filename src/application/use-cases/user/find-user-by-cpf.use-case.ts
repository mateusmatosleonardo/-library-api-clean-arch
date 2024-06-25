import { UserRepository } from "@/application/interfaces/user/user-repository.interface";

type Output = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
};

export class FindUserByCpfUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(cpf: string): Promise<Output | null> {
    return this.userRepository.findByCpf(cpf);
  }
}
