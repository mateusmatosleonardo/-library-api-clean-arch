import { prisma } from "../prisma";
import { parseDateTime } from "@/shared/utils/convert-date";
import { LoanRepository } from "@/application/interfaces/loan/loan-repository.interface";
import { CreateLoan } from "@/application/dto/loan/create-loan.dto";
import { Loan } from "@/application/dto/loan/loan.dto";

export class LoanRepositoryDatabase implements LoanRepository {
  async save({
    userCpf,
    books,
    exitDate,
    returnDate,
  }: CreateLoan): Promise<Loan> {
    const exitDateTime = parseDateTime(String(exitDate));
    const returnDateTime = parseDateTime(String(returnDate));

    const findBooks = await prisma.book.findMany({
      where: {
        isbn: {
          in: books.map((book) => book.isbn),
        },
      },
    });

    const loan = await prisma.loan.create({
      data: {
        userCpf,
        exitDate: exitDateTime,
        returnDate: returnDateTime,
        books: {
          connect: findBooks.map((book) => ({ id: book.id })),
        },
      },
      select: {
        user: {
          select: {
            name: true,
            email: true,
            cpf: true,
            phone: true,
          },
        },
        exitDate: true,
        returnDate: true,
        books: {
          select: {
            name: true,
            author: true,
            gender: true,
            isbn: true,
          },
        },
      },
    });

    return loan;
  }
}
