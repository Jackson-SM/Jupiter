import { Request, ResponseToolkit } from "@hapi/hapi";
import { CreateUserCase } from "../../../../application/use-cases/users/create-user-case";
import { PrismaUserRepository } from "../../../database/prisma/repositories/prisma-user-repository";
import bcrypt from "bcrypt";
import { Password } from "../../../../domain/entities/User/Password";
import { CreateUserBody } from "../../dtos/create-user-body";
import jwt from "jsonwebtoken";
import { UserViewModel } from "../../view-models/user-view-model";
import authService from "../../../../application/services/AuthService";

export class CreateUserController {
  constructor(private createUserCase: CreateUserCase) {}

  public async handle(request: Request, h: ResponseToolkit) {
    const { firstName, lastName, email, password } =
      request.payload as CreateUserBody;

    try {
      const passwordHash = await bcrypt.hash(password, 10);

      const { user: userCreated } = await this.createUserCase.execute({
        firstName,
        lastName,
        email,
        password: new Password(passwordHash),
      });

      const token = await authService.generateToken(userCreated);
      const user = UserViewModel.toHttp(userCreated);
      return h.response({ user: user, token: token }).code(201);
    } catch (err: any) {
      return h
        .response({ statusCode: err.statusCode, message: err.message })
        .code(err.statusCode);
    }
  }
}
