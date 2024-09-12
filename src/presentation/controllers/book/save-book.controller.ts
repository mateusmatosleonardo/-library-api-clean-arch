import { z } from "zod"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { BookRepositoryDatabase } from "@/infra/db/repositories/book-repository-database"
import { SaveBookUseCase } from "@/application/use-cases/book/save-book.use-case"
import { FindBookByIsbnUseCase } from "@/application/use-cases/book/find-book-by-isbn.use-case"

export async function saveBookController(app: FastifyInstance) {
  const bookRepository = new BookRepositoryDatabase()
  const saveBookUseCase = new SaveBookUseCase(bookRepository)
  const findBookByIsbnUseCase = new FindBookByIsbnUseCase(bookRepository)

  app.post(
    "/books",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const schema = z.object({
        title: z.string({
          required_error: "Title cannot be empty",
          invalid_type_error: "Name must be a string"
        }),
        subtitle: z.string().nullable(),
        author: z.string({
          required_error: "Author cannot be empty",
          invalid_type_error: "Author must be a string"
        }),
        publisher: z.string({
          required_error: "Publisher cannot be empty",
          invalid_type_error: "Publisher must be a string"
        }),
        publication_date: z.coerce.date({
          required_error: "Publication date cannot be empty",
          invalid_type_error: "Publication date must be a valid date"
        }),
        gender: z.string({
          required_error: "Gender cannot be empty",
          invalid_type_error: "Gender must be a string"
        }),
        edition: z.string({
          required_error: "Edition cannot be empty",
          invalid_type_error: "Edition must be a string"
        }),
        availability: z.string({
          required_error: "Availability cannot be empty",
          invalid_type_error: "Availability must be a string"
        }),
        isbn: z.string({
          required_error: "ISBN cannot be empty",
          invalid_type_error: "ISBN must be a string"
        })
      })

      try {
        const input = schema.parse(request.body)

        const existingBook = await findBookByIsbnUseCase.execute(
          input.isbn
        )

        if (existingBook) {
          return reply.status(409).send({ message: "Book already exists" })
        }

        const book = await saveBookUseCase.execute(input)

        return reply.status(201).send(book)
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            message: error.errors.map((err) => err.message).join(", ")
          })
        }
        return reply.status(400).send({ message: "Unable to create book" })
      }
    }
  )
}
