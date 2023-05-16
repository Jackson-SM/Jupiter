import { FindUserByIdCase } from "~/application/use-cases/users/find-user-by-id-case";
import { PrismaUserRepository } from "~/infra/database/prisma/repositories/prisma-user-repository";
import { FindUserByIdController } from "./FindUserByIdController";
import { CreateUserController } from "./CreateUserController";
import { CreateUserCase } from "~/application/use-cases/users/create-user-case";

const prismaRepository = new PrismaUserRepository();

const createUserCase = new CreateUserCase(prismaRepository);
const findUserByIdCase = new FindUserByIdCase(prismaRepository);

const createUserController = new CreateUserController(createUserCase);
const findUserByIdController = new FindUserByIdController(findUserByIdCase);

export { findUserByIdController, createUserController };
