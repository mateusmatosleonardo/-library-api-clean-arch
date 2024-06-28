import { Loan } from "../loan/loan.dto";

export type User = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  loan?: Loan | null;
};
