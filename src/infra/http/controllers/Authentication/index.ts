import { AuthenticationUseCase } from "~/application/use-cases/auths/authentication-use-case";
import { AuthenticationLoginController } from "./AuthenticationLoginController";
import { PrismaUserRepository } from "~/infra/database/prisma/repositories/prisma-user-repository";
import { JwtTokenProvider } from "~/application/services/JwtTokenProvider";

const prismaRepository = new PrismaUserRepository();

const jwtTokenProvider = new JwtTokenProvider();

const authenticationCase = new AuthenticationUseCase(
  prismaRepository,
  jwtTokenProvider,
);

const authenticationLoginController = new AuthenticationLoginController(
  authenticationCase,
);

export { authenticationLoginController };
