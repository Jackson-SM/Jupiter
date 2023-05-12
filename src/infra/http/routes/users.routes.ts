import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";
import { PrismaClient } from "@prisma/client";
import { PrismaUserRepository } from "../../database/prisma/repositories/prisma-user-repository";
import { UserViewModel } from "../view-models/user-view-model";
import Joi from "@hapi/joi";
import { User } from "../../../domain/entities/User/User";
import { Password } from "../../../domain/entities/User/Password";

const usersRoutes = {
  name: "users",
  dependencies: ["prisma"],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/users",
        handler: async (request, h) => {
          const prismaRepository = new PrismaUserRepository();

          const user = await prismaRepository.findById(
            "645d22c31c03050e898f8125",
          );

          if (!user) {
            return [];
          }

          const userToHttp = UserViewModel.toHttp(user);

          return userToHttp;
        },
      },
      {
        method: "POST",
        path: "/v1/users",
        options: {
          validate: {
            payload: Joi.object({
              firstName: Joi.string().required(),
              lastName: Joi.string().required(),
              email: Joi.string().required(),
              password: Joi.string().required(),
            }),
          },
        },
        handler: async function (request: Request, h: ResponseToolkit) {
          const prismaRepository = new PrismaUserRepository();

          const { firstName, lastName, email, password } = request.payload as {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          };

          const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: new Password("123456"),
          });

          try {
            await prismaRepository.create(user);
            return h.response().code(201);
          } catch (err) {
            console.log(err);
            return h.response().code(400);
          }
        },
      },
    ]);
  },
};

export default usersRoutes;
