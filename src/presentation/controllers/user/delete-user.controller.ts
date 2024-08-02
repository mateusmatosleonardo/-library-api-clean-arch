import { z } from "zod"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { UserRepositoryDatabase } from "@/infra/db/repositories/user-repository-database"
import { DeleteUserUseCase } from "@/application/use-cases/user/delete-user.use-case"

export async function deleteUserController(app: FastifyInstance) {
  const userRepository = new UserRepositoryDatabase()
  const deleteUserUseCase = new DeleteUserUseCase(userRepository)

  app.delete(
    "/users",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const id = request.body

      const deleteUserSchema = z.object({
        id: z.string().uuid().min(1, "Id cannot be empty")
      })

      try {
        const input = deleteUserSchema.parse(id)

        const user = await deleteUserUseCase.execute(input.id)

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
