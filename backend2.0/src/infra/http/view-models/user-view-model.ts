import { User } from '@src/domain/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
