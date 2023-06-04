import Hapi from "@hapi/hapi";
import {
  addParticipantInProjectController,
  createProjectController,
  findAllParticipantsByProjectIdController,
  findProjectByIdController,
  removeParticipantInProjectController,
  removeProjectController,
} from "../controllers/Project";
import payloadParamsId from "../payloads/payloadParamsId";
import addParticipantProjectPayload from "../payloads/addParticipantProjectPayload";
import createProjectPayload from "../payloads/createProjectPayload";
import { findAllGroupsByProjectController } from "../controllers/Group";
import removeParticipantInProjectPayload from "../payloads/removeParticipantInProjectPayload";

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
        method: "DELETE",
        path: "/v1/projects/{id}/",
        handler: removeProjectController.handler,
        options: {
          validate: {
            params: payloadParamsId,
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
        method: "DELETE",
        path: "/v1/projects/participants/",
        handler: removeParticipantInProjectController.handler,
        options: {
          validate: {
            payload: removeParticipantInProjectPayload,
          },
        },
      },
      {
        method: "GET",
        path: "/v1/projects/{id}/groups/",
        handler: findAllGroupsByProjectController.handler,
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
