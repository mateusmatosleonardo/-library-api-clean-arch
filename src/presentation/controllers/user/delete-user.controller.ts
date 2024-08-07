import { z } from "zod"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { UserRepositoryDatabase } from "@/infra/db/repositories/user-repository-database"
import { DeleteUserUseCase } from "@/application/use-cases/user/delete-user.use-case"

export async function deleteUserController(app: FastifyInstance) {
  const userRepository = new UserRepositoryDatabase()
  const deleteUserUseCase = new DeleteUserUseCase(userRepository)

  app.delete(
    "/users/:userId",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = request.params as { userId: string }

      const userIdSchema = z
        .string()
        .uuid()
        .min(1, "E-mail cannot be empty")

      try {
        const input = userIdSchema.parse(userId)

        const user = await deleteUserUseCase.execute(input)

        if (user) {
          return reply.status(200).send(user)
        } else {
          return reply.status(404).send({ message: "User not found" })
        }
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
