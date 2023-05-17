import { Request, ResponseToolkit } from "@hapi/hapi";
import { AuthenticationUseCase } from "~/application/use-cases/auths/authentication-use-case";
import { IAuthenticateBody } from "../../dtos/authenticate-body";

export class AuthenticationLoginController {
  constructor(private authencationUseCase: AuthenticationUseCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { email, password } = request.payload as IAuthenticateBody;

    try {
      const token = await this.authencationUseCase.authenticate(
        email,
        password,
      );

      return token;
    } catch (err: any) {
      h.response(err).code(err.statusCode || 500);
    }
  };
}
