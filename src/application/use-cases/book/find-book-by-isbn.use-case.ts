import { BookRepository } from "@/application/interfaces/book-repository.interface";

export class FindBookByIsbnUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(isbn: string) {
    return this.bookRepository.findByIsbn(isbn);
  }
}
