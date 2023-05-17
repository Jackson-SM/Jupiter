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

      return h.response({ token: token }).code(200);
    } catch (err: any) {
      return h
        .response({
          message: err.message,
          statusCode: err.statusCode || err.output.statusCode,
        })
        .code(err.statusCode || err.output.statusCode || 500);
    }
  };
}
