import { User } from "../entities/User";

export interface UserRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}
