import { JwtPayload } from "~/application/services/AuthenticationService";

export interface TokenProviderRepository {
  generateToken(payload: JwtPayload): Promise<string>;
}
