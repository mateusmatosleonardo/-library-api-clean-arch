import { z } from "zod"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { UserRepositoryDatabase } from "@/infra/db/repositories/user-repository-database"
import { UpdateUserUseCase } from "@/application/use-cases/user/update-user.use-case"
import { User } from "@/application/dto/user/user.dto"

export async function updateUserController(app: FastifyInstance) {
  const userRepository = new UserRepositoryDatabase()
  const updateUserUseCase = new UpdateUserUseCase(userRepository)

  app.patch(
    "/users/:userId",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = request.params as { userId: string }
      const input = request.body as Partial<User>

      try {
        const user = await updateUserUseCase.execute(userId, input)

        if (!user) {
          return null
        }

        return reply.status(200).send(user)
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            message: error.errors.map((err) => err.message).join(", ")
          })
        }
      }
    }
  )
}
