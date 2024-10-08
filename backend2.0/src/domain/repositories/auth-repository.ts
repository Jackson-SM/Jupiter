export abstract class AuthenticationRepository {
  abstract signIn(email: string, password: string): Promise<string>;
  abstract login(email: string, password: string): Promise<string>;
}
