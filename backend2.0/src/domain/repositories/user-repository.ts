import { User } from '../entities/User';

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
}
