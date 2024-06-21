import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaBookRepository } from "infra/db/repositories/prisma-book-repository";
import { FindBookUseCase } from "application/use-cases/book/find-book.use-case";

export async function findBookController(app: FastifyInstance) {
  const bookRepository = new PrismaBookRepository();
  const findBookUseCase = new FindBookUseCase(bookRepository);

  app.get("/books", async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, isbn } = request.query as { name: string; isbn: string };

    try {
      const book = await findBookUseCase.execute(name, isbn);

      if (book) {
        return reply.status(200).send(book);
      } else {
        return reply.status(404).send({ message: "Book not found" });
      }
    } catch (error) {
      return reply.status(400).send({ message: "Unable to search for book" });
    }
  });
}
