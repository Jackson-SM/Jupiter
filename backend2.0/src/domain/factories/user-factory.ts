import { User } from '../entities/User';

export class UserFactory {
  static create(user: User): User {
    return new User(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        disabled: user.disabled,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id,
    );
  }
}
