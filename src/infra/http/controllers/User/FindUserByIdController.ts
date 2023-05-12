import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindUserByIdCase } from "../../../../application/use-cases/users/find-user-by-id-case";
import { PrismaUserRepository } from "../../../database/prisma/repositories/prisma-user-repository";
import { UserViewModel } from "../../view-models/user-view-model";

class FindUserByIdController {
  constructor(private findUserByIdCase: FindUserByIdCase) {}

  public async handle(request: Request, h: ResponseToolkit) {
    const { user } = await findUserByIdCase.execute({
      id: "645d22c31c03050e898f8125",
    });

    if (!user) {
      return null;
    }

    return UserViewModel.toHttp(user);
  }
}

const prismaRepository = new PrismaUserRepository();
const findUserByIdCase = new FindUserByIdCase(prismaRepository);
const findUserByIdController = new FindUserByIdController(findUserByIdCase);

export default findUserByIdController;
