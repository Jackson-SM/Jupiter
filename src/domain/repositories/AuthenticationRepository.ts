import { User } from "../entities/User/User";

export interface AuthenticationServiceRepository {
  authenticate(email: string, password: string): Promise<string>;
}
