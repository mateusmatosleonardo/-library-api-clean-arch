import { UserRepository } from "@/application/interfaces/user/user-repository.interface"

type Input = {
  name: string
  email: string
  cpf: string
  phone: string
}

type Output = {
  message: string
}

export class SaveUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    return this.userRepository.save(input)
  }
}
