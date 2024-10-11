import { User } from '@src/domain/entities/user';
import { UserRepository } from '@src/domain/repositories/user-repository';
import * as bcrypt from 'bcrypt';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async save(user: User): Promise<User> {
    const userExists = this.users.find((u) => u.email === user.email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: passwordHash,
      disabled: user.disabled,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    this.users.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    const userExists = this.users.find((u) => u.email === email);

    if (!userExists) {
      throw new Error('User not found');
    }

    return userExists;
  }
}
