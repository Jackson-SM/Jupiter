import { Request, ResponseToolkit } from "@hapi/hapi";
import { CreateUserCase } from "../../../../application/use-cases/users/create-user-case";
import { PrismaUserRepository } from "../../../database/prisma/repositories/prisma-user-repository";

class CreateUserController {
  constructor(private createUserCase: CreateUserCase) {}

  public async handle(request: Request, h: ResponseToolkit) {
    const { firstName, lastName, email, password } = request.payload as {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };

    try {
      await createUserCase.execute({
        firstName,
        lastName,
        email,
        password: password,
      });
      return h.response().code(201);
    } catch (err: any) {
      return h.response({ message: err.message }).code(400);
    }
  }
}

const prismaRepository = new PrismaUserRepository();
const createUserCase = new CreateUserCase(prismaRepository);
const createUserController = new CreateUserController(createUserCase);

export default createUserController;
