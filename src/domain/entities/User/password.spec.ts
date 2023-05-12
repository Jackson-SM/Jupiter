import { Password } from "./Password";

describe("User", () => {
  it("should create a new password", () => {
    const password = new Password("123456");

    expect(password).toBeTruthy();
  });
  it("should throw an error if the password is less than 3", () => {
    expect(() => new Password("12")).toThrow();
  });
  it("should throw an error if the password is great than 240", () => {
    expect(() => new Password("1".repeat(51))).toThrow();
  });
});
