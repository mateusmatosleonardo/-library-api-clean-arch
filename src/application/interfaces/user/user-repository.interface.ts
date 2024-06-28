import { User } from "@/application/dto/user/user.dto";

export interface UserRepository {
  save(user: User): Promise<{ message: string }>;
  findByEmail(email: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  findAll(): Promise<User[] | null>;
}
