import { makeUser } from "../../../../tests/factories/makeUser";

describe("User", () => {
  it("should create a new user instance", () => {
    const user = makeUser();

    expect(user).toBeTruthy();
  });
});
