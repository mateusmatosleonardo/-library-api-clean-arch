import { BookRepository } from "@/application/interfaces/book/book-repository.interface";

type Input = {
  name: string;
  quantity: number;
  author: string;
  gender: string;
  isbn: string;
};

type Output = Input & {};

export class SaveBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(input: Input): Promise<Output> {
    return this.bookRepository.save(input);
  }
}
