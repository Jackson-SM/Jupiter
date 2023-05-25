import Hapi from "@hapi/hapi";
import {
  createCommentController,
  findCommentByIdController,
} from "../controllers/Comment";

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
      },
    ]);
  },
};

export default commentsRoutes;
