import { AuthRepositoryTokenReturn } from '../interfaces/auth-repository-token-return';

export abstract class AuthenticationRepository {
  abstract signIn(
    email: string,
    password: string,
  ): Promise<AuthRepositoryTokenReturn>;
  abstract login(
    email: string,
    password: string,
  ): Promise<AuthRepositoryTokenReturn>;
}
