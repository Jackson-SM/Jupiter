import { Password } from "./Password";

describe("User", () => {
  it("should create a new password", () => {
    const password = new Password("123456");

    expect(password).toBeTruthy();
    expect(password.value).toEqual("123456");
  });
  it("should throw an error if the password is less than 3", () => {
    expect(() => new Password("12")).toThrow();
  });
  it("should throw an error if the password is great than 80", () => {
    expect(() => new Password("1".repeat(81))).toThrow();
  });
});
