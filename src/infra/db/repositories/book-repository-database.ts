import { prisma } from "infra/db/prisma";
import { BookRepository } from "@/application/interfaces/book/book-repository.interface";
import { Book } from "@/application/dto/book/book.dto";

type InputBook = Book & {};

const select = {
  id: true,
  name: true,
  author: true,
  quantity: true,
  gender: true,
  isbn: true,
  created_at: true,
};

export class BookRepositoryDatabase implements BookRepository {
  async save(input: InputBook): Promise<Book> {
    const book = await prisma.book.create({
      data: input,
      select,
    });

    return book;
  }

  async findAll(): Promise<Book[] | null> {
    const books = await prisma.book.findMany({ select });

    if (!books) {
      return null;
    }

    return books;
  }

  async findByNameOrIsbn(name?: string, isbn?: string): Promise<Book | null> {
    const book = await prisma.book.findFirst({
      where: {
        OR: [{ name }, { isbn }],
      },
      select,
    });

    if (!book) {
      return null;
    }

    return book;
  }

  async findByIsbn(isbn: string): Promise<Book | null> {
    const book = await prisma.book.findUnique({
      where: {
        isbn,
      },
      select,
    });

    if (!book) {
      return null;
    }

    return book;
  }
}
