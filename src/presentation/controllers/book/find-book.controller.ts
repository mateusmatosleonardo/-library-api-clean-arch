import { z } from "zod"
import { FastifyInstance } from "fastify"
import { BookRepositoryDatabase } from "@/infra/db/repositories/book-repository-database"
import { FindBookUseCase } from "@/application/use-cases/book/find-book.use-case"
import { FindAllBooksUseCase } from "@/application/use-cases/book/find-all-books.use-case"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { zodToJsonSchema } from "zod-to-json-schema"

export async function findBookController(app: FastifyInstance) {
  const bookRepository = new BookRepositoryDatabase()
  const findBookUseCase = new FindBookUseCase(bookRepository)
  const findAllBooksUseCase = new FindAllBooksUseCase(bookRepository)

  const querySchema = z.object({
    name: z.string().optional(),
    isbn: z.string().optional()
  })

  app.withTypeProvider<ZodTypeProvider>().get(
    "/books",
    {
      schema: {
        querystring: zodToJsonSchema(querySchema)
      }
    },
    async (request, reply) => {
      const { name, isbn } = request.query as any

      if (name || isbn) {
        const book = await findBookUseCase.execute(name, isbn)

        if (book) {
          return reply.status(200).send(book)
        }

        return reply.status(404).send({ message: "Book not found" })
      }

      const books = await findAllBooksUseCase.execute()

      if (books && books.length > 0) {
        return reply.status(200).send(books)
      }

      return reply.status(404).send({ message: "No books found" })
    }
  )
}
