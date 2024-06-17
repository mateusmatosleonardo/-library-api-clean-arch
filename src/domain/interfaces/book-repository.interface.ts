import { CreateBookDTO } from "application/dto/book/create-book.dto";

export interface BookRepository {
  create(input: CreateBookDTO): Promise<{ message: string }>;
}
