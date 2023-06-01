import { FindUserByIdCase } from "../../../../application/use-cases/users/find-user-by-id-case";
import { PrismaUserRepository } from "../../../../infra/database/prisma/repositories/prisma-user-repository";
import { FindUserByIdController } from "./FindUserByIdController";
import { CreateUserController } from "./CreateUserController";
import { CreateUserCase } from "~/application/use-cases/users/create-user-case";
import { AuthenticationService } from "~/application/services/AuthenticationService";
import { AuthenticationUseCase } from "~/application/use-cases/auths/authentication-use-case";
import { JwtTokenProvider } from "~/application/services/JwtTokenProvider";

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

export { findUserByIdController, createUserController };
