import { BookRepository } from "@/application/interfaces/book/book-repository.interface"
import { Book } from "@/application/dto/book/book.dto"

type Input = Book
type Output = Input & {}

export class SaveBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(input: Input): Promise<Output> {
    return this.bookRepository.save(input)
  }
}
