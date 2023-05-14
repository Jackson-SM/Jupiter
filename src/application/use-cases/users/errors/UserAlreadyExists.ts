export class UserAlreadyExists extends Error {
  private readonly statusCode: number = 409;

  constructor() {
    super("Usuário Já existente");
  }
}
