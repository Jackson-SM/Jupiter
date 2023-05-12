import bcrypt from "bcrypt";

export class Password {
  private password: string;

  get value(): string {
    return this.password;
  }

  private validateContentLength(password: string): boolean {
    return password.length >= 3 && password.length <= 50;
  }

  private async hashPassword(password: string): Promise<void> {
    const hash_password = await bcrypt.hash(password, 10);

    this.password = hash_password;
  }

  constructor(password: string) {
    const validPassword = this.validateContentLength(password);

    if (!validPassword) {
      throw new Error("Invalid Length Password");
    }

    this.hashPassword(password);
  }
}
