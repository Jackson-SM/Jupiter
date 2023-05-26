import Hapi from "@hapi/hapi";
import {
  addParticipantInProjectController,
  createProjectController,
  findAllParticipantsByProjectIdController,
  findProjectByIdController,
} from "../controllers/Project";
import { findTaskByProjectIdController } from "../controllers/Task";
import payloadParamsId from "../payloads/payloadParamsId";
import addParticipantProjectPayload from "../payloads/addParticipantProjectPayload";
import createProjectPayload from "../payloads/createProjectPayload";

const projectsRoutes = {
  name: "projects",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: "/v1/projects/",
        handler: createProjectController.handler,
        options: {
          validate: {
            payload: createProjectPayload,
          },
        },
      },
      {
        method: "POST",
        path: "/v1/projects/participants/",
        handler: addParticipantInProjectController.handler,
        options: {
          validate: {
            payload: addParticipantProjectPayload,
          },
        },
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
