import Hapi from "@hapi/hapi";
import {
  createCommentController,
  findCommentByIdController,
} from "../controllers/Comment";
import payloadParamsId from "../payloads/payloadParamsId";

const commentsRoutes = {
  name: "comments",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: "/v1/comments/",
        handler: createCommentController.handler,
      },
      {
        method: "GET",
        path: "/v1/comments/{id}",
        handler: findCommentByIdController.handler,
        options: {
          validate: {
            params: payloadParamsId,
          },
        },
      },
    ]);
  },
};

export default commentsRoutes;
