import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";
import { PrismaClient } from "@prisma/client";
import { PrismaUserRepository } from "~/infra/database/prisma/repositories/PrismaUserRepository";

const usersRoutes = {
  name: "users",
  dependencies: ["prisma"],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/users",
        handler: async (request, h) => {
          const prismaRepository = new PrismaUserRepository(
            request.server.app.prisma,
          );
        },
      },
      {
        method: "POST",
        path: "/v1/users",
        handler: async function (request: Request, h: ResponseToolkit) {
          const prisma = new PrismaClient();

          try {
            const user = await prisma.user.create({
              data: {
                email: "email@prisma.com",
                firstName: "John",
                lastName: "Senna",
                password: "password",
              },
            });

            return user;
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  },
};

export default usersRoutes;
