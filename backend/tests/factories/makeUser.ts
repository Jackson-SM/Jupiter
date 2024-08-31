import { Password } from "~/domain/entities/User/Password";
import { User } from "../../src/domain/entities/User/User";

type Override = Partial<User>;

export function makeUser(override?: Override): User {
  return new User({
    email: "example@example.com",
    firstName: "firstname",
    lastName: "lastname",
    password: new Password("password"),
    ...override,
  });
}
