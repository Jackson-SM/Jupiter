import { User } from "@application/entities/User";
import { UserRepository } from "@application/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
