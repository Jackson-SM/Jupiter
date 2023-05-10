import { User } from "./User";

describe("User", () => {
  it("should create a new user instance", () => {
    const user = new User({
      email: "user@example.com",
      password: "password",
      firstName: "first",
      lastName: "last",
    });
  });
});
