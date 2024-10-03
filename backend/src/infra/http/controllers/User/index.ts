import { JwtTokenProvider } from "~/application/services/JwtTokenProvider";
import { CreateUserCase } from "~/application/use-cases/users/create-user-case";
import { FindUserByIdCase } from "../../../../application/use-cases/users/find-user-by-id-case";
import { PrismaUserRepository } from "../../../../infra/database/prisma/repositories/prisma-user-repository";
import { CreateUserController } from "./CreateUserController";
import { FindUserByIdController } from "./FindUserByIdController";

const prismaRepository = new PrismaUserRepository();
// Providers

const tokenProvider = new JwtTokenProvider();

//Use Cases
const createUserCase = new CreateUserCase(prismaRepository);
const findUserByIdCase = new FindUserByIdCase(prismaRepository);

//Controllers
const createUserController = new CreateUserController(
  createUserCase,
  tokenProvider,
);
const findUserByIdController = new FindUserByIdController(findUserByIdCase);

export { createUserController, findUserByIdController };
