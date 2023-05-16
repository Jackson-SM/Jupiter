import { JwtPayload } from "~/application/services/AuthService";
import { User } from "../entities/User/User";

export interface AuthRepository {
  generateToken(user: User): Promise<string>;
  verifyToken(token: string): Promise<JwtPayload>;
}
