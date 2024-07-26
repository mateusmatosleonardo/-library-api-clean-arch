import { UserEntity, UserProps } from "@/domain/entitites/user.entity";

describe("UserEntity", () => {
  let userProps: UserProps;

  beforeEach(() => {
    userProps = {
      name: "John Doe",
      email: "john.doe@test.com",
      cpf: "12345678901",
      phone: "1234567890",
    };
  });

  const sut = new UserEntity({
    name: "Mateus Leonardo",
    email: "mateus@example.com",
    cpf: "12312312344",
    phone: "88981890344",
  });

  it("validate name", () => {
    expect(sut.props.name).toBeDefined();
  });

  it("should create a user entity and retrieve the name", () => {
    const user = new UserEntity(userProps);
    expect(user.getName()).toBe("Mateus");
  });
});
