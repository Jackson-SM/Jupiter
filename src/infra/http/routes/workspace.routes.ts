import Hapi from "@hapi/hapi";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createWorkspaceController } from "../controllers/Workspace";

const workspacesRoutes = {
  name: "workspaces",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: "/v1/workspaces",
        handler: createWorkspaceController.handler,
      },
    ]);
  },
};

export default workspacesRoutes;
