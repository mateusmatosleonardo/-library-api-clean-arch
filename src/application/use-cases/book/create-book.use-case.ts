import { BookRepository } from "@/application/interfaces/book-repository.interface";
import { BookDTO } from "@/application/dto/book/book.dto";

export class CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(input: BookDTO) {
    return this.bookRepository.create(input);
  }
}
