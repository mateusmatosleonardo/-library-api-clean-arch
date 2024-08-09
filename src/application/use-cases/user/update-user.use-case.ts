import { UserRepository } from "@/application/interfaces/user/user-repository.interface"

type Input = {
  name: string
  email: string
  cpf: string
  phone: string
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, input: Partial<Input>) {
    return this.userRepository.update(id, input)
  }
}
