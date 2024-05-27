import { CreateUserDTO } from "../dto/create-user.dto";

export class CreateUserUseCase {
  constructor(private readonly userRepository: any) {}

  async execute(input: CreateUserDTO) {
    return this.userRepository.register(input);
  }
}
