import { z } from "zod";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SaveUserUseCase } from "@/application/use-cases/user/save-user.use-case";
import { FindUserByEmailUseCase } from "@/application/use-cases/user/find-user-by-email.use-case";
import { FindUserByCpfUseCase } from "@/application/use-cases/user/find-user-by-cpf.use-case";
import { UserRepositoryDatabase } from "@/infra/db/repositories/user-repository-database";

export async function saveUserController(app: FastifyInstance) {
  const userRepository = new UserRepositoryDatabase();
  const saveUserUseCase = new SaveUserUseCase(userRepository);
  const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
  const findUserByCpfUseCase = new FindUserByCpfUseCase(userRepository);

  app.post("/users", async (request: FastifyRequest, reply: FastifyReply) => {
    const saveUserSchema = z.object({
      name: z.string().min(1, "Name cannot be empty"),
      email: z
        .string()
        .min(1, "Email connot be empty")
        .email("This is not a valid email."),
      cpf: z
        .string()
        .min(11, "This is not a valid cpf")
        .max(11, "This is not a valid cpf"),
      phone: z
        .string()
        .min(11, "This is not a valid number")
        .max(11, "This is not a valid number"),
    });

    try {
      const input = saveUserSchema.parse(request.body);

      const [email, cpf] = await Promise.all([
        findUserByEmailUseCase.execute(input.email),
        findUserByCpfUseCase.execute(input.cpf),
      ]);

      if (email) {
        return reply.status(409).send({ message: "Email already exists" });
      }

      if (cpf) {
        return reply.status(409).send({ message: "CPF already exists" });
      }

      await saveUserUseCase.execute(input);

      return reply.status(201).send({ message: "User created successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply
          .status(400)
          .send({ message: error.errors.map((err) => err.message).join(", ") });
      }
    }
  });
}
