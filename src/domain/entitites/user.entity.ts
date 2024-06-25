import { Entity } from "@/shared/entities/entity";

export type UserProps = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
};

export class UserEntity extends Entity {
  constructor(public readonly props: UserProps, id?: string) {
    super(props, id);
  }

  getName() {
    return this.props.name;
  }

  getEmail() {
    return this.props.email;
  }

  getCpf() {
    return this.props.cpf;
  }

  getPhone() {
    return this.props.phone;
  }
}
