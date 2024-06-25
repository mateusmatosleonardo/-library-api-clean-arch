import { User } from "@/application/dto/user/user.dto";

export interface UserRepository {
  save(user: User): Promise<{ message: string }>;
}
