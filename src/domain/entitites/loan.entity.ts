import { Entity } from "@/shared/entities/entity"
import { User } from "@/application/dto/user/user.dto"
import { Book } from "@/application/dto/book/book.dto"

export type LoanProps = {
  exitDate: Date
  returnDate: Date
  user: User
  books: Book | null
}

export class LoanEntity extends Entity<LoanProps> {
  constructor(public readonly props: LoanProps, id?: string) {
    super(props, id)
  }
}
