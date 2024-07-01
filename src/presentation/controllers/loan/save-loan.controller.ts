import { z } from "zod";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { LoanRepositoryDatabase } from "@/infra/db/repositories/loan-repository-database";
import { SaveLoanUseCase } from "@/application/use-cases/loan/save-loan.use-case";
import { FindUserByCpfUseCase } from "@/application/use-cases/user/find-user-by-cpf.use-case";
import { FindBookByIsbnUseCase } from "@/application/use-cases/book/find-book-by-isbn.use-case";
import { UserRepositoryDatabase } from "@/infra/db/repositories/user-repository-database";
import { BookRepositoryDatabase } from "@/infra/db/repositories/book-repository-database";
import { formatDateTime } from "@/shared/utils/format-date";

export async function saveLoanController(app: FastifyInstance) {
  const loanRepository = new LoanRepositoryDatabase();
  const userRepository = new UserRepositoryDatabase();
  const bookRepository = new BookRepositoryDatabase();
  const saveLoanUseCase = new SaveLoanUseCase(loanRepository);
  const findUserByCpfUseCase = new FindUserByCpfUseCase(userRepository);
  const findBookByIsbn = new FindBookByIsbnUseCase(bookRepository);

  app.post("/loans", async (request: FastifyRequest, reply: FastifyReply) => {
    const bookSchema = z.object({
      isbn: z.string().min(1, "ISBN cannot be empty"),
    });

    const saveLoanSchema = z.object({
      exitDate: z.string().min(6, "invalid date"),
      returnDate: z.string().min(6, "invalid date"),
      userCpf: z
        .string()
        .min(11, "this is not a valid cpf")
        .max(11, "this is not a valid cpf"),
      books: z
        .array(bookSchema)
        .min(1, "at least one book ISBN must be provided"),
    });

    try {
      const input = saveLoanSchema.parse(request.body);

      const user = await findUserByCpfUseCase.execute(input.userCpf);

      if (user?.loan) {
        return reply
          .status(409)
          .send({ message: "user already has an active loan" });
      }

      for (const book of input.books) {
        const foundBook = await findBookByIsbn.execute(book.isbn);
        if (!foundBook) {
          return reply
            .status(404)
            .send({ message: `book with ISBN ${book.isbn} not found` });
        }
      }

      const loan = await saveLoanUseCase.execute(input as any);

      const loanFormatted = {
        user: loan.user,
        exitDate: formatDateTime(loan.exitDate),
        returnDate: formatDateTime(loan.returnDate),
        books: loan.books,
      };

      return reply.status(201).send(loanFormatted);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply
          .status(400)
          .send({ message: error.errors.map((err) => err.message).join(", ") });
      }
      return reply.status(400).send({ message: "unable to create loan" });
    }
  });
}
