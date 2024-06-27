import { User } from "@/application/dto/user/user.dto";

export type Loan = {
  exitDate: Date;
  returnDate: Date;
  user: User;
  books: {
    name: string;
    author: string;
    gender: string;
    isbn: string;
  };
};
