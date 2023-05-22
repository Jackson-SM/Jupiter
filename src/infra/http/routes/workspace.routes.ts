import Hapi from "@hapi/hapi";
import {
  createWorkspaceController,
  findWorkspaceByIdController,
  getAllWorkspacecByCretorIdController,
} from "../controllers/Workspace";
import { findProjectByWorkspaceIdIdController } from "../controllers/Project";

const workspacesRoutes = {
  name: "workspaces",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/workspaces/{id}/",
        handler: findWorkspaceByIdController.handler,
      },
      {
        method: "GET",
        path: "/v1/workspaces/{id}/projects/",
        handler: findProjectByWorkspaceIdIdController.handler,
      },
      {
        method: "POST",
        path: "/v1/workspaces/",
        handler: createWorkspaceController.handler,
      },
    ]);
  },
};

export default workspacesRoutes;
