import { CreateBookDTO } from "application/dto/book/create-book.dto";
import { prisma } from "infra/db/prisma";
import { BookRepository } from "domain/interfaces/book-repository.interface";

export class PrismaBookRepository implements BookRepository {
  async create(input: CreateBookDTO): Promise<any> {
    return prisma.book.create({
      data: input,
    });
  }
}
