import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindUserByIdCase } from "../../../../application/use-cases/users/find-user-by-id-case";
import { UserViewModel } from "../../view-models/user-view-model";

export class FindUserByIdController {
  constructor(private findUserByIdCase: FindUserByIdCase) {}

  public async handle(request: Request, h: ResponseToolkit) {
    const { id } = request.params;

    try {
      const { user } = await this.findUserByIdCase.execute({
        id: id,
      });

      return UserViewModel.toHttp(user);
    } catch (error: any) {
      return h
        .response({
          statusCode: error.statusCode,
          message: error.message,
        })
        .code(error.statusCode);
    }
  }
}
