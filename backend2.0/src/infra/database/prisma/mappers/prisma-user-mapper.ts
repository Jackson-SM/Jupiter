import { User as UserPrisma } from '@prisma/client';
import { User } from '@src/domain/entities/User';

export class PrismaUserMapper {
  static toDomain(user: UserPrisma): User {
    return new User(
      {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        disabled: user.disabled,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id,
    );
  }
  static toPrisma(user: User): UserPrisma {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      disabled: user.disabled,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
