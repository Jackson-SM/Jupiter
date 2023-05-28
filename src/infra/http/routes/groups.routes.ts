import Hapi from "@hapi/hapi";
import payloadParamsId from "../payloads/payloadParamsId";
import { findTaskByGroupIdController } from "../controllers/Task";

const groupsRoutes = {
  name: "groups",
  register: async function (server: Hapi.Server) {
    server.route([
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
