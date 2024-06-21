import { Book } from "application/dto/book/create-book.dto";

export interface BookRepository {
  create(input: Book): Promise<{ message: string }>;
  findByIsbn(isbn: string): Promise<Book | null>;
  findByNameOrIsbn(name?: string, isbn?: string): Promise<Book | null>;
}
