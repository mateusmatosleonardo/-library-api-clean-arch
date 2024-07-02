import { z } from "zod";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserRepositoryDatabase } from "@/infra/db/repositories/user-repository-database";
import { FindAllUsersUseCase } from "@/application/use-cases/user/find-all-users.use-case";

export async function findAllUsersController(app: FastifyInstance) {
  const userRepository = new UserRepositoryDatabase();
  const findAllUserUseCase = new FindAllUsersUseCase(userRepository);

  app.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await findAllUserUseCase.execute();

      if (!users) {
        return null;
      }

      return reply.status(200).send(users);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply
          .status(400)
          .send({ message: error.errors.map((err) => err.message).join(", ") });
      }
    }
  });
}
