import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";
import { createCommentController } from "../controllers/Comment";

const commentsRoutes = {
  name: "comments",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: "/v1/comments/",
        handler: createCommentController.handler,
      },
    ]);
  },
};

export default commentsRoutes;
