import { CreateUserDTO } from "../dto/create-user.dto";

export class RegisterUserUseCase {
  constructor(private readonly userRepository: any) {} // repo service

  async execute(input: CreateUserDTO) {
    return this.userRepository.register(input);
  }
}
