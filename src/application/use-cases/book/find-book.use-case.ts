import { BookRepository } from "@/application/interfaces/book-repository.interface";

export class FindBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(name?: string, isbn?: string) {
    return this.bookRepository.findByNameOrIsbn(name, isbn);
  }
}
