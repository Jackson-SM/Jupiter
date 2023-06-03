import { Request, ResponseToolkit } from "@hapi/hapi";
import { AuthenticationUseCase } from "~/application/use-cases/auths/authentication-use-case";
import { IAuthenticateBody } from "../../dtos/authenticate-body";
import { UserViewModel } from "../../view-models/user-view-model";

export class AuthenticationLoginController {
  constructor(private authencationUseCase: AuthenticationUseCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { email, password } = request.payload as IAuthenticateBody;

    const { token, user } = await this.authencationUseCase.authenticate(
      email,
      password,
    );

    const userFormatToHttp = UserViewModel.toHttp(user);

    return h.response({ user: userFormatToHttp, token: token }).code(200);
  };
}
