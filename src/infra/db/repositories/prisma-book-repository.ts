import { Book } from "application/dto/book/create-book.dto";
import { prisma } from "infra/db/prisma";
import { BookRepository } from "interfaces/book-repository.interface";

export class PrismaBookRepository implements BookRepository {
  async create(input: Book): Promise<any> {
    return prisma.book.create({
      data: input,
    });
  }

  async findByNameOrIsbn(name?: string, isbn?: string): Promise<Book | null> {
    const book = await prisma.book.findFirst({
      where: {
        OR: [{ name }, { isbn }],
      },
    });

    if (!book) {
      return null;
    }

    return {
      name: book.name,
      quantity: book.quantity,
      author: book.author,
      gender: book.gender,
      isbn: book.isbn,
    };
  }

  async findByIsbn(isbn: string): Promise<Book | null> {
    const book = await prisma.book.findFirst({
      where: {
        isbn,
      },
    });

    if (!book) {
      return null;
    }

    return {
      name: book.name,
      quantity: book.quantity,
      author: book.author,
      gender: book.gender,
      isbn: book.isbn,
    };
  }
}
