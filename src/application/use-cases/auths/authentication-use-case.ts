import { TokenProviderRepository } from "~/domain/repositories/TokenProviderRepository";
import { UserRepository } from "~/domain/repositories/UserRepository";
import bcrypt from "bcrypt";
import Boom from "@hapi/boom";
import { JwtPayload } from "~/application/services/AuthenticationService";

export class AuthenticationUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenProvider: TokenProviderRepository,
  ) {}

  async authenticate(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw Boom.notFound("User not found");
    }

    const userIsValid = await bcrypt.compare(password, user.password.value);

    if (!userIsValid) {
      throw Boom.unauthorized("User is not valid");
    }

    const payload: JwtPayload = { id: user.id, email: user.email };
    const token = await this.tokenProvider.generateToken(payload);

    return token;
  }
}
