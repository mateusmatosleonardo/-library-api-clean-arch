import { BookRepository } from "@/application/interfaces/book/book-repository.interface"

export class FindBookByIsbnUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(isbn: string) {
    return this.bookRepository.findByIsbn(isbn)
  }
}
