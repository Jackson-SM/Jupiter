import Hapi from "@hapi/hapi";
import {
  addTaskResponsibleController,
  createTaskController,
  findTaskByIdController,
} from "../controllers/Task";
import { findAllCommentsByTaskIdController } from "../controllers/Comment";
import payloadParamsId from "../payloads/payloadParamsId";
import createTaskPayload from "../payloads/createTaskPayload";
import addTaskPayload from "../payloads/addTaskPayload";

const tasksRoutes = {
  name: "tasks",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/tasks/{id}/",
        handler: findTaskByIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "GET",
        path: "/v1/tasks/{id}/comments/",
        handler: findAllCommentsByTaskIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "POST",
        path: "/v1/tasks/",
        handler: createTaskController.handler,
        options: {
          validate: {
            payload: createTaskPayload,
          },
        },
      },
      {
        method: "POST",
        path: "/v1/tasks/responsibles/",
        handler: addTaskResponsibleController.handler,
        options: {
          validate: {
            payload: addTaskPayload,
          },
        },
      },
    ]);
  },
};

export default tasksRoutes;
