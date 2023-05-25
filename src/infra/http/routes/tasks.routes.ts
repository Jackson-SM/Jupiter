import Hapi from "@hapi/hapi";
import {
  addTaskResponsibleController,
  createTaskController,
  findTaskByIdController,
} from "../controllers/Task";
import { findAllCommentsByTaskIdController } from "../controllers/Comment";

const tasksRoutes = {
  name: "tasks",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/tasks/{id}/",
        handler: findTaskByIdController.handler,
      },
      {
        method: "GET",
        path: "/v1/tasks/{id}/comments/",
        handler: findAllCommentsByTaskIdController.handler,
      },
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
