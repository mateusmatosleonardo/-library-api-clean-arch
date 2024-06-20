import { BookRepository } from "interfaces/book-repository.interface";
import { Book } from "application/dto/book/create-book.dto";

export class CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(input: Book) {
    return this.bookRepository.create(input);
  }
}
