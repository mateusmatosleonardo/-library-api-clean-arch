import { UserRepository } from "@/application/interfaces/user/user-repository.interface";

type Output = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
};

export class FindUserByEmail {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<Output | null> {
    return this.userRepository.findByEmail(email);
  }
}
