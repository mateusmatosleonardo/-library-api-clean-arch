import { UserRepository } from "@/application/interfaces/user/user-repository.interface"

type Output = {
  name: string
  email: string
  cpf: string
  phone: string
}

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<Output[] | null> {
    return this.userRepository.findAll()
  }
}
