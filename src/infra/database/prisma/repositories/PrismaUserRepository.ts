import { User } from "~/domain/entities/User";
import { UserRepository } from "~/domain/repositories/UserRepository";

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async create(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
