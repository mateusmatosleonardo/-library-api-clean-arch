import { z } from "zod";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { BookDTO as Book } from "@/application/dto/book/book.dto";
import { PrismaBookRepository } from "@/infra/db/repositories/prisma-book-repository";
import { CreateBookUseCase } from "@/application/use-cases/book/create-book.use-case";
import { FindBookByIsbnUseCase } from "@/application/use-cases/book/find-book-by-isbn.use-case";

export async function createBookController(app: FastifyInstance) {
  const bookRepository = new PrismaBookRepository();
  const createBookUseCase = new CreateBookUseCase(bookRepository);
  const findBookUseCase = new FindBookByIsbnUseCase(bookRepository);

  app.post("/books", async (request: FastifyRequest, reply: FastifyReply) => {
    const createBookSchema = z.object({
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
      const input: Book = createBookSchema.parse(request.body);

      const book = await findBookUseCase.execute(input.isbn);

      if (book) {
        return reply.status(409).send({ message: "Book already exists" });
      }

      await createBookUseCase.execute(input);

      return reply.status(201).send({ message: "Book created" });
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
