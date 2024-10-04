import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities/User';
import { UserRepository } from '@src/domain/repositories/user-repository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserService implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    const userExist = await this.prisma.user.findFirst({
      where: { email: user.email },
    });

    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const raw = PrismaUserMapper.toPrisma(user);

    const userCreated = await this.prisma.user.create({
      data: raw,
    });

    const userDomain = PrismaUserMapper.toDomain(userCreated);

    return userDomain;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const userDomain = PrismaUserMapper.toDomain(user);

    return userDomain;
  }
}
