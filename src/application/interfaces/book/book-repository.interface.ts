import { Book } from "@/application/dto/book/book.dto";

export interface BookRepository {
  save(book: Book): Promise<any>;
  findByIsbn(isbn: string): Promise<any | null>;
  findByNameOrIsbn(name?: string, isbn?: string): Promise<any | null>;
}
