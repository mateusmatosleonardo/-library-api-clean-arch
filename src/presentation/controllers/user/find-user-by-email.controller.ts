import { z } from "zod"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { UserRepositoryDatabase } from "@/infra/db/repositories/user-repository-database"
import { FindUserByEmailUseCase } from "@/application/use-cases/user/find-user-by-email.use-case"

export async function findUserByEmailController(app: FastifyInstance) {
  const userRepository = new UserRepositoryDatabase()
  const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository)

  app.get(
    "/users/:userEmail",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { userEmail } = request.params as { userEmail: string }

      const findUserSchema = z.object({
        userEmail: z.string().email().min(1, "E-mail cannot be empty")
      })

      try {
        const input = findUserSchema.parse({ userEmail })

        const user = await findUserByEmailUseCase.execute(input.userEmail)

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
