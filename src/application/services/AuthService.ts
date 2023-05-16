import { AuthRepository } from "~/domain/repositories/AuthRepository";
import { User } from "../../domain/entities/User/User";
import { sign, verify } from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  email: string;
}

class AuthService implements AuthRepository {
  private readonly jwtSecret: string;

  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }

  async generateToken(user: User): Promise<string> {
    const payload: JwtPayload = { id: user.id, email: user.email };
    const token = sign(payload, this.jwtSecret, {
      expiresIn: 60 * 60 * 24, // expire in 25 hours
    });
    return token;
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    const payload = verify(token, this.jwtSecret) as JwtPayload;
    return payload;
  }
}

export default new AuthService(process.env.SECRET_KEY!);
