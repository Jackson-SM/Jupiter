import { User } from "~/application/entities/User";
import { UserRepository } from "~/application/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
