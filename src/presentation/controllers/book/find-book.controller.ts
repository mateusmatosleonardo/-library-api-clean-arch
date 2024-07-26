import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { BookRepositoryDatabase } from "@/infra/db/repositories/book-repository-database"
import { FindBookUseCase } from "@/application/use-cases/book/find-book.use-case"
import { FindAllBooksUseCase } from "@/application/use-cases/book/find-all-books.use-case"

export async function findBookController(app: FastifyInstance) {
  const bookRepository = new BookRepositoryDatabase()
  const findBookUseCase = new FindBookUseCase(bookRepository)
  const findAllBooksUseCase = new FindAllBooksUseCase(bookRepository)

  app.get(
    "/books",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { name, isbn } = request.query as {
        name: string
        isbn: string
      }

      try {
        if (name || isbn) {
          const book = await findBookUseCase.execute(name, isbn)

          if (book) {
            return reply.status(200).send(book)
          } else {
            return reply.status(404).send({ message: "Book not found" })
          }
        } else {
          const books = await findAllBooksUseCase.execute()

          if (!books) {
            return reply.status(404).send({ message: "No books found" })
          }

          return reply.status(200).send(books)
        }
      } catch (error) {
        return reply
          .status(400)
          .send({ message: "Error when searching for books" })
      }
    }
  )
}
