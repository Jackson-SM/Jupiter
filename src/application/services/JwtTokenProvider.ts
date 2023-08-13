import dotenv from "dotenv";
dotenv.config();
import { TokenProviderRepository } from "~/domain/repositories/TokenProviderRepository";
import { JwtPayload } from "./AuthenticationService";
import jwt from "jsonwebtoken";

export class JwtTokenProvider implements TokenProviderRepository {
  async generateToken(payload: JwtPayload): Promise<string> {
    const token = jwt.sign(payload, process.env.SECRET_KEY! || 'secret', {
      expiresIn: 60 * 60 * 24, // 25 hours
    });

    return token;
  }
}
