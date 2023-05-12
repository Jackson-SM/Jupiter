import { UserRepository } from "~/domain/repositories/UserRepository";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import { User } from "../../../../domain/entities/User";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const data = await prisma.user.findUnique({ where: { id: id } });

    if (!data) {
      return null;
    }

    const user = PrismaUserMapper.toDomain(data);

    return user;
  }
  async create(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
