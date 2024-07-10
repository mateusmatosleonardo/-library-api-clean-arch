import { z } from "zod";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { BookRepositoryDatabase } from "@/infra/db/repositories/book-repository-database";
import { SaveBookUseCase } from "@/application/use-cases/book/save-book.use-case";
import { FindBookByIsbnUseCase } from "@/application/use-cases/book/find-book-by-isbn.use-case";

export async function saveBookController(app: FastifyInstance) {
  const bookRepository = new BookRepositoryDatabase();
  const saveBookUseCase = new SaveBookUseCase(bookRepository);
  const findBookByIsbnUseCase = new FindBookByIsbnUseCase(bookRepository);

  app.post("/books", async (request: FastifyRequest, reply: FastifyReply) => {
    const saveBookSchema = z.object({
      name: z.string().min(1, "Name cannot be empty"),
      quantity: z
        .number()
        .int()
        .positive("Quantity must be a positive integer"),
      author: z.string().min(1, "Author cannot be empty"),
      gender: z.string().min(1, "Gender cannot be empty"),
      isbn: z.string().min(1, "ISBN cannot be empty"),
    });

    try {
      const input = saveBookSchema.parse(request.body);

      const existingBook = await findBookByIsbnUseCase.execute(input.isbn);

      if (existingBook) {
        return reply.status(409).send({ message: "Book already exists" });
      }

      const book = await saveBookUseCase.execute(input);

      return reply.status(201).send(book);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply
          .status(400)
          .send({ message: error.errors.map((err) => err.message).join(", ") });
      }
      return reply.status(400).send({ message: "Unable to create book" });
    }
  });
}
