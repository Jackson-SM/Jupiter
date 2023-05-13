import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";

const commentsRoutes = {
  name: "comments",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/comments",
        handler: function (request: Request, h: ResponseToolkit) {
          return "Hello World";
        },
      },
    ]);
  },
};

export default commentsRoutes;
