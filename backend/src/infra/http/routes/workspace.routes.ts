import Hapi from "@hapi/hapi";
import {
  createWorkspaceController,
  findWorkspaceByIdController,
  getAllWorkspacecByCretorIdController,
  removeWorkspaceController,
} from "../controllers/Workspace";
import { findProjectByWorkspaceIdIdController } from "../controllers/Project";
import payloadParamsId from "../payloads/payloadParamsId";
import createWorkspacePayload from "../payloads/createWorkspacePayload";

const workspacesRoutes = {
  name: "workspaces",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/workspaces/{id}/",
        handler: findWorkspaceByIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "GET",
        path: "/v1/workspaces/{id}/projects/",
        handler: findProjectByWorkspaceIdIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "POST",
        path: "/v1/workspaces/",
        handler: createWorkspaceController.handler,
        options: {
          validate: {
            payload: createWorkspacePayload,
          },
        },
      },
      {
        method: "DELETE",
        path: "/v1/workspaces/{id}/",
        handler: removeWorkspaceController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
    ]);
  },
};

export default workspacesRoutes;
