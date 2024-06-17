import { BookRepository } from "domain/interfaces/book-repository.interface";
import { CreateBookDTO } from "application/dto/book/create-book.dto";

export class CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(input: CreateBookDTO) {
    return this.bookRepository.create(input);
  }
}
