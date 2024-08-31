export class Password {
  private readonly password: string;

  get value(): string {
    return this.password;
  }

  private validateContentLength(password: string): boolean {
    return password.length >= 3 && password.length <= 80;
  }

  constructor(password: string) {
    const validPassword = this.validateContentLength(password);

    if (!validPassword) {
      throw new Error("Invalid Length Password");
    }

    this.password = password;
  }
}
