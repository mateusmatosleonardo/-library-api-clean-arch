import { BookDTO } from "@/application/dto/book/book.dto";

export interface BookRepository {
  create(input: BookDTO): Promise<{ message: string }>;
  findByIsbn(isbn: string): Promise<BookDTO | null>;
  findByNameOrIsbn(name?: string, isbn?: string): Promise<BookDTO | null>;
}
