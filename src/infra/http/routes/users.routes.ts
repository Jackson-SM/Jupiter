import Hapi from "@hapi/hapi";
import createUserPayload from "../payloads/createUserPayload";
import {
  createUserController,
  findUserByIdController,
} from "../controllers/User";
import {
  findAllParticipantsByProjectIdController,
  findProjectByLeadIdController,
} from "../controllers/Project";

const usersRoutes = {
  name: "users",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/users/{id}",
        handler: findUserByIdController.handle,
        options: {
          auth: false,
        },
      },
      {
        method: "GET",
        path: "/v1/users/{id}/projects/",
        handler: findAllParticipantsByProjectIdController.handler,
      },
      {
        method: "GET",
        path: "/v1/users/{id}/projects-lead/",
        handler: findProjectByLeadIdController.handler,
      },
      {
        method: "POST",
        path: "/v1/users/",
        handler: createUserController.handle,
        options: {
          validate: {
            payload: createUserPayload,
          },
          auth: false,
        },
      },
    ]);
  },
};

export default usersRoutes;
