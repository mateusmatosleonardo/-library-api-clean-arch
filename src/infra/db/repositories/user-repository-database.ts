import { User } from "@/application/dto/user/user.dto";
import { UserRepository } from "@/application/interfaces/user/user-repository.interface";
import { prisma } from "../prisma";

export class UserRepositoryDatabase implements UserRepository {
  async save(user: User): Promise<{ message: string }> {
    await prisma.user.create({
      data: user,
    });

    return { message: "User created successfully" };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        loan: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        cpf,
      },
      include: {
        loan: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findAll(): Promise<User[] | null> {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        cpf: true,
        phone: true,
      },
    });

    if (!users) {
      return null;
    }

    return users;
  }
}
