import Hapi from "@hapi/hapi";
import {
  addParticipantInProjectController,
  createProjectController,
  findAllParticipantsByProjectIdController,
  findProjectByIdController,
} from "../controllers/Project";
import { findTaskByProjectIdController } from "../controllers/Task";
import payloadParamsId from "../payloads/payloadParamsId";

const projectsRoutes = {
  name: "projects",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: "/v1/projects/",
        handler: createProjectController.handler,
      },
      {
        method: "POST",
        path: "/v1/projects/participants/",
        handler: addParticipantInProjectController.handler,
      },
      {
        method: "GET",
        path: "/v1/projects/{id}/tasks/",
        handler: findTaskByProjectIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "GET",
        path: "/v1/projects/{id}/",
        handler: findProjectByIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "GET",
        path: "/v1/projects/{id}/participants/",
        handler: findAllParticipantsByProjectIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
    ]);
  },
};

export default projectsRoutes;
