import { UserRepository } from "@/application/interfaces/user/user-repository.interface"

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<{ message: string } | null> {
    return this.userRepository.delete(id)
  }
}
