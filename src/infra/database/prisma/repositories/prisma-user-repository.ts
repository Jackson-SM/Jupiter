import { UserRepository } from "~/domain/repositories/UserRepository";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/entities/User/User";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await prisma.user.create({
      data: raw,
    });
  }
}
