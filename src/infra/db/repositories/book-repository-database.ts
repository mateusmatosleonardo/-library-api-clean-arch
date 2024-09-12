import { prisma } from "infra/db/prisma"
import { BookRepository } from "@/application/interfaces/book/book-repository.interface"
import { Book } from "@/application/dto/book/book.dto"

const select = {
  id: true,
  title: true,
  subtitle: true,
  author: true,
  publisher: true,
  publication_date: true,
  gender: true,
  edition: true,
  availability: true,
  isbn: true
}

export class BookRepositoryDatabase implements BookRepository {
  async save(input: Book): Promise<Book> {
    const book = await prisma.book.create({
      data: input,
      select: {
        id: true,
        title: true,
        subtitle: true,
        author: true,
        publisher: true,
        publication_date: true,
        gender: true,
        edition: true,
        availability: true,
        isbn: true
      }
    })

    return book
  }

  async findAll(): Promise<Book[] | null> {
    const books = await prisma.book.findMany({ select })

    if (!books) {
      return null
    }

    return books
  }

  async findByTitleOrIsbn(
    title?: string,
    isbn?: string
  ): Promise<Book | null> {
    if (title || isbn) {
      return prisma.book.findFirst({
        where: {
          OR: [{ title }, { isbn }]
        },
        select
      })
    }
    return null
  }

  async findByIsbn(isbn: string): Promise<Book | null> {
    const book = await prisma.book.findUnique({
      where: {
        isbn
      },
      select
    })

    if (!book) {
      return null
    }

    return book
  }

  async delete(id: string): Promise<{ message: string }> {
    await prisma.book.delete({
      where: {
        id
      }
    })

    return { message: "book deleted successfully" }
  }
}
