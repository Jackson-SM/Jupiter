import { Request, ResponseToolkit } from "@hapi/hapi";
import { CreateUserCase } from "../../../../application/use-cases/users/create-user-case";
import bcrypt from "bcrypt";
import { Password } from "../../../../domain/entities/User/Password";
import { CreateUserBody } from "../../dtos/create-user-body";
import { UserViewModel } from "../../view-models/user-view-model";
import { JwtTokenProvider } from "~/application/services/JwtTokenProvider";

export class CreateUserController {
  constructor(
    private createUserCase: CreateUserCase,
    private jwtTokenProvider: JwtTokenProvider,
  ) {}

  public handle = async (request: Request, h: ResponseToolkit) => {
    const { firstName, lastName, email, password } =
      request.payload as CreateUserBody;

    try {
      const { user: userCreated } = await this.createUserCase.execute({
        firstName,
        lastName,
        email,
        password: new Password(password),
      });

      const token = await this.jwtTokenProvider.generateToken({
        id: userCreated.id,
        email: userCreated.email,
      });
      const user = UserViewModel.toHttp(userCreated);
      return h.response({ user: user, token: token }).code(201);
    } catch (error: any) {
      return h
        .response({ statusCode: error.statusCode, message: error.message })
        .code(error.statusCode || error.output.statusCode || 500);
    }
  };
}
