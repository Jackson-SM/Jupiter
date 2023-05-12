import { UserRepository } from "~/domain/repositories/UserRepository";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import { User } from "../../../../domain/entities/User";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id: id } });

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
