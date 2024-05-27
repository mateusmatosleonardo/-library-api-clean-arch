export class GetUserByCpfUseCase {
  constructor(private readonly userRepository: any) {}

  async execute() {
    return this.userRepository.getUser();
  }
}
