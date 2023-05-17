import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindUserByIdCase } from "../../../../application/use-cases/users/find-user-by-id-case";
import { UserViewModel } from "../../view-models/user-view-model";
import Boom from "@hapi/boom";

export class FindUserByIdController {
  constructor(private findUserByIdCase: FindUserByIdCase) {}

  public handle = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    try {
      const { user } = await this.findUserByIdCase.execute({
        id: id,
      });

      return UserViewModel.toHttp(user);
    } catch (err: any) {
      return h
        .response({ message: err.message, statusCode: err.output.statusCode })
        .code(err.output.statusCode);
    }
  };
}
