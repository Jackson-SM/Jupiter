import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";
import { createTaskController } from "../controllers/Task";

const tasksRoutes = {
  name: "tasks",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: "/v1/tasks/",
        handler: createTaskController.handler,
      },
    ]);
  },
};

export default tasksRoutes;
