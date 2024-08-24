export type Either<L, R> = Left<L, R> | Right<L, R>

export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isLeft() {
    return true
  }

  isRight() {
    return false
  }
}

export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight() {
    return true
  }

  isLeft() {
    return false
  }
}

export const left = <L, R>(l: L): Either<L, R> => new Left(l)

export const right = <L, R>(r: R): Either<L, R> => new Right(r)
