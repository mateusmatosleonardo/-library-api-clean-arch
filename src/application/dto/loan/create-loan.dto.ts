export type CreateLoan = {
  exitDate: Date;
  returnDate: Date;
  userCpf: string;
  books: { isbn: string }[];
};
