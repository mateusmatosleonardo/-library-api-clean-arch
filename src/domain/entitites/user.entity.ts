import { Entity } from "@/shared/entities/entity"

export type UserProps = {
  name: string
  email: string
  cpf: string
  phone: string
}

export class UserEntity extends Entity {
  constructor(public readonly props: UserProps, id?: string) {
    super(props, id)
  }

  getName() {
    return this.props.name
  }

  getEmail() {
    return this.props.email
  }

  getCpf() {
    return this.props.cpf
  }

  getPhone() {
    return this.props.phone
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private validateCPF(cpf: string): boolean {
    return cpf.length === 11
  }

  private validatePhone(phone: string): boolean {
    return phone.length === 11
  }

  setName(name: string) {
    this.props.name = name
  }

  setEmail(email: string) {
    if (!this.validateEmail(email)) {
      throw Error("Invalid email format")
    }
    this.props.email = email
  }

  setCfp(cpf: string) {
    if (!this.validateCPF(cpf)) {
      throw Error("Invalid CPF format")
    }
    this.props.cpf = cpf
  }

  setPhone(phone: string) {
    if (!this.validatePhone(phone)) {
      throw new Error("Invalid phone format")
    }
    this.props.phone = phone
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props
    }
  }
}
