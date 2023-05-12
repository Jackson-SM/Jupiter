import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindUserByEmail } from "../../../../application/use-cases/users/find-user-by-email-case";
import { PrismaUserRepository } from "../../../database/prisma/repositories/prisma-user-repository";
import { UserViewModel } from "../../view-models/user-view-model";

class FindUserByIdController {
  constructor(private findUserByEmail: FindUserByEmail) {}

  public async handle(request: Request, h: ResponseToolkit) {
    const { email } = request.payload as {
      email: string;
    };

    const { user } = await this.findUserByEmail.execute({
      email: email,
    });

    if (!user) {
      return null;
    }

    return UserViewModel.toHttp(user);
  }
}

const prismaRepository = new PrismaUserRepository();
const findUserByIdCase = new FindUserByEmail(prismaRepository);
const findUserByIdController = new FindUserByIdController(findUserByIdCase);

export default findUserByIdController;
