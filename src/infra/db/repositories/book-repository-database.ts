import { prisma } from "infra/db/prisma";
import { BookRepository } from "@/application/interfaces/book/book-repository.interface";
import { Book } from "@/application/dto/book/book.dto";

export class BookRepositoryDatabase implements BookRepository {
  async save(input: Book): Promise<{ message: string }> {
    await prisma.book.create({
      data: input,
    });

    return { message: "Book created" };
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
