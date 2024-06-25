import { User } from "@/application/dto/user/user.dto";
import { UserRepository } from "@/application/interfaces/user/user-repository.interface";

export class UserRepositoryDatabase implements UserRepository {
  async save(user: User): Promise<{ message: string }> {
    await this.save(user);
    return { message: "User created successfully" };
  }
}
