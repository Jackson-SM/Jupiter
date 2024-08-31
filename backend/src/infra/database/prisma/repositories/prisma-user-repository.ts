import { UserRepository } from "~/domain/repositories/UserRepository";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import { User } from "../../../../domain/entities/User/User";
import prisma from "../client/prisma";
import Boom from "@hapi/boom";

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({ where: { id: id } });

      if (!user) {
        return null;
      }

      return PrismaUserMapper.toDomain(user);
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await prisma.user.create({
      data: raw,
    });
  }
}
