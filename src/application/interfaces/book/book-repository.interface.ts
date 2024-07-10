import { Book } from "@/application/dto/book/book.dto";

type InputBook = Book & {};

export interface BookRepository {
  save(input: InputBook): Promise<any>;
  findAll(): Promise<Book[] | null>;
  findByIsbn(isbn: string): Promise<Book | null>;
  findByNameOrIsbn(name?: string, isbn?: string): Promise<Book | null>;
}
