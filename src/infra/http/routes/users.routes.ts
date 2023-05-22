import Hapi from "@hapi/hapi";
import createUserPayload from "../payloads/createUserPayload";
import {
  createUserController,
  findUserByIdController,
} from "../controllers/User";
import { findProjectByLeadIdController } from "../controllers/Project";
import { getAllWorkspacecByCretorIdController } from "../controllers/Workspace";

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
        path: "/v1/users/{id}/projects-lead/",
        handler: findProjectByLeadIdController.handler,
      },
      {
        method: "GET",
        path: "/v1/users/{id}/workspaces/",
        handler: getAllWorkspacecByCretorIdController.handler,
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
