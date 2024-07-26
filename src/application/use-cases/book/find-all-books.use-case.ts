import { BookRepository } from "@/application/interfaces/book/book-repository.interface"

export class FindAllBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute() {
    return this.bookRepository.findAll()
  }
}
