import { AuthenticationUseCase } from "../use-cases/auths/authentication-use-case";

export interface JwtPayload {
  id: string;
  email: string;
}

export class AuthenticationService {
  constructor(private authenticationUseCase: AuthenticationUseCase) {}
  async authenticate(email: string, password: string): Promise<string> {
    return await this.authenticationUseCase.authenticate(email, password);
  }
}
