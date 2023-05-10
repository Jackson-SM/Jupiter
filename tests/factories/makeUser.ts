import { User } from "../../src/application/entities/User";

type Override = Partial<User>;

export function makeUser(override?: Override): User {
  return new User({
    email: "example@example.com",
    firstName: "firstname",
    lastName: "lastname",
    password: "password",
    ...override,
  });
}
