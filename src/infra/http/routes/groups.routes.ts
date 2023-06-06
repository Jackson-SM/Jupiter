import Hapi from "@hapi/hapi";
import payloadParamsId from "../payloads/payloadParamsId";
import { findTaskByGroupIdController } from "../controllers/Task";
import {
  createGroupController,
  deleteGroupController,
  editNameGroupController,
} from "../controllers/Group";
import createGroupPayload from "../payloads/createGroupPayload";

const groupsRoutes = {
  name: "groups",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: "/v1/groups/",
        handler: createGroupController.handler,
        options: {
          validate: {
            payload: createGroupPayload,
          },
        },
      },
      {
        method: "DELETE",
        path: "/v1/groups/{id}/",
        handler: deleteGroupController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "PATCH",
        path: "/v1/groups/{id}/",
        handler: editNameGroupController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
      {
        method: "GET",
        path: "/v1/groups/{id}/tasks/",
        handler: findTaskByGroupIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
    ]);
  },
};

export default groupsRoutes;
