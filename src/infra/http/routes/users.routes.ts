import Hapi from "@hapi/hapi";
import findUserByIdController from "../controllers/User/FindUserByIdController";
import createUserController from "../controllers/User/CreateUserController";
import createUserPayload from "../payloads/createUserPayload";

const usersRoutes = {
  name: "users",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/users/{id}",
        handler: findUserByIdController.handle,
      },
      {
        method: "POST",
        path: "/v1/users/",
        handler: createUserController.handle,
        options: {
          validate: {
            payload: createUserPayload,
          },
        },
      },
    ]);
  },
};

export default usersRoutes;
