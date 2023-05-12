import Hapi from "@hapi/hapi";
import Joi from "@hapi/joi";
import findUserByIdController from "../controllers/User/FindUserByIdController";
import createUserController from "../controllers/User/CreateUserController";

const usersRoutes = {
  name: "users",
  dependencies: ["prisma"],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/users",
        handler: findUserByIdController.handle,
      },
      {
        method: "POST",
        path: "/v1/users",
        handler: createUserController.handle,
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
      },
    ]);
  },
};

export default usersRoutes;
