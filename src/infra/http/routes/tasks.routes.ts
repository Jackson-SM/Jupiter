import Hapi from "@hapi/hapi";
import {
  addTaskResponsibleController,
  createTaskController,
} from "../controllers/Task";

const tasksRoutes = {
  name: "tasks",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: "/v1/tasks/",
        handler: createTaskController.handler,
      },
      {
        method: "POST",
        path: "/v1/tasks/responsibles/",
        handler: addTaskResponsibleController.handler,
      },
    ]);
  },
};

export default tasksRoutes;
