import { BookRepository } from "@/application/interfaces/book/book-repository.interface"

export class FindBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(title?: string, isbn?: string) {
    return this.bookRepository.findByTitleOrIsbn(title, isbn)
  }
}
