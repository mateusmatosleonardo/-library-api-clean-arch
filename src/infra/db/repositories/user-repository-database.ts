import { User } from "@/application/dto/user/user.dto"
import { UserRepository } from "@/application/interfaces/user/user-repository.interface"
import { prisma } from "../prisma"

export class UserRepositoryDatabase implements UserRepository {
  async save(input: User): Promise<{ id: string }> {
    const user = await prisma.user.create({
      data: input
    })

    return { id: user.id }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      include: {
        loan: true
      }
    })

    if (!user) {
      return null
    }

    return user
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        cpf
      },
      include: {
        loan: true
      }
    })

    if (!user) {
      return null
    }

    return user
  }

  async findAll(): Promise<User[] | null> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true
      }
    })

    if (!users) {
      return null
    }

    return users
  }

  async delete(id: string): Promise<{ message: string } | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (user) {
      await prisma.user.delete({
        where: {
          id
        }
      })

      return { message: "User successfully deleted" }
    } else {
      return null
    }
  }
}
