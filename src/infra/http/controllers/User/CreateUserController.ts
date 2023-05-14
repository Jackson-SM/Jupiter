import { Request, ResponseToolkit } from "@hapi/hapi";
import { CreateUserCase } from "../../../../application/use-cases/users/create-user-case";
import { PrismaUserRepository } from "../../../database/prisma/repositories/prisma-user-repository";
import bcrypt from "bcrypt";
import { Password } from "../../../../domain/entities/User/Password";
import { CreateUserBody } from "../../dtos/create-user-body";
import jwt from "jsonwebtoken";
import { UserViewModel } from "../../view-models/user-view-model";

class CreateUserController {
  constructor(private createUserCase: CreateUserCase) {}

  public async handle(request: Request, h: ResponseToolkit) {
    const { firstName, lastName, email, password } =
      request.payload as CreateUserBody;

    try {
      const passwordHash = await bcrypt.hash(password, 10);

      const { user: userCreated } = await createUserCase.execute({
        firstName,
        lastName,
        email,
        password: new Password(passwordHash),
      });

      const payload = { id: userCreated.id, email: userCreated.email };
      const secretKey = process.env.SECRET_KEY;

      const user = UserViewModel.toHttp(userCreated);

      const token = jwt.sign(payload, secretKey!, { expiresIn: 60 * 60 * 24 }); // 24 hours
      return h.response({ user: user, token: token }).code(201);
    } catch (err: any) {
      return h
        .response({ statusCode: err.statusCode, message: err.message })
        .code(err.statusCode);
    }
  }
}

const prismaRepository = new PrismaUserRepository();
const createUserCase = new CreateUserCase(prismaRepository);
const createUserController = new CreateUserController(createUserCase);

export default createUserController;
