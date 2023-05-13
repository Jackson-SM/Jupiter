import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindUserByIdCase } from "../../../../application/use-cases/users/find-user-by-id-case";
import { PrismaUserRepository } from "../../../database/prisma/repositories/prisma-user-repository";
import { UserViewModel } from "../../view-models/user-view-model";
import { UserNotFound } from "../../../../application/use-cases/users/errors/UserNotFound";

class FindUserByIdController {
  constructor(private findUserByIdCase: FindUserByIdCase) {}

  public async handle(request: Request, h: ResponseToolkit) {
    const { id } = request.params;

    try {
      const { user } = await findUserByIdCase.execute({
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

const prismaRepository = new PrismaUserRepository();
const findUserByIdCase = new FindUserByIdCase(prismaRepository);
const findUserByIdController = new FindUserByIdController(findUserByIdCase);

export default findUserByIdController;
