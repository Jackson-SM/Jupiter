import Hapi from "@hapi/hapi";
import createUserPayload from "../payloads/createUserPayload";
import {
  createUserController,
  findUserByIdController,
} from "../controllers/User";
import { findProjectByLeadIdController } from "../controllers/Project";
import { getAllWorkspacecByCretorIdController } from "../controllers/Workspace";
import { findTaskByResponsibleIdController } from "../controllers/Task";
import { findAllCommentsByUserIdController } from "../controllers/Comment";
import payloadParamsId from "../payloads/payloadParamsId";

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
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "GET",
        path: "/v1/users/{id}/tasks/",
        handler: findTaskByResponsibleIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "GET",
        path: "/v1/users/{id}/projects-lead/",
        handler: findProjectByLeadIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "GET",
        path: "/v1/users/{id}/workspaces/",
        handler: getAllWorkspacecByCretorIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "GET",
        path: "/v1/users/{id}/comments/",
        handler: findAllCommentsByUserIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
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
