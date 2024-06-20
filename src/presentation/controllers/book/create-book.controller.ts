import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Book } from "application/dto/book/create-book.dto";
import { PrismaBookRepository } from "infra/db/repositories/prisma-book-repository";
import { CreateBookUseCase } from "application/use-cases/book/create-book.use-case";
import { z } from "zod";

export async function createBookController(app: FastifyInstance) {
  const bookRepository = new PrismaBookRepository();
  const createBookUseCase = new CreateBookUseCase(bookRepository);

  app.post("/books", async (request: FastifyRequest, reply: FastifyReply) => {
    const createBookSchema = z.object({
      name: z.string(),
      quantity: z.number().int().positive(),
      author: z.string(),
      gender: z.string(),
      isbn: z.string(),
    });

    try {
      const input: Book = createBookSchema.parse(request.body);

      await createBookUseCase.execute(input);

      return reply.status(201).send("Book created");
    } catch (error) {
      return reply.status(400).send({ message: "Unable to create book" });
    }
  });
}
