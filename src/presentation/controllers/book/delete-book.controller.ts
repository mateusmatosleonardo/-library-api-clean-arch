import { z } from "zod";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { BookRepositoryDatabase } from "@/infra/db/repositories/book-repository-database";
import { DeleteBookUseCase } from "@/application/use-cases/book/delete-book.use-case";

export async function deleteBookController(app: FastifyInstance) {
  const bookRepository = new BookRepositoryDatabase();
  const deleteBookUseCase = new DeleteBookUseCase(bookRepository);

  app.delete("/books", async (request: FastifyRequest, reply: FastifyReply) => {
    const deleteBookSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = deleteBookSchema.parse(request.body);

    try {
      await deleteBookUseCase.execute(id);

      return { message: "Book deleted successfully" };
    } catch (error) {
      return reply
        .status(400)
        .send({ message: "Error when deleting the book" });
    }
  });
}
