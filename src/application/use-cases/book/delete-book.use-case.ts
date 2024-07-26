import { BookRepository } from "@/application/interfaces/book/book-repository.interface"

export class DeleteBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(id: string) {
    return this.bookRepository.delete(id)
  }
}
