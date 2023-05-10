import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";

const tasksRoutes = {
  name: "v1/tasks",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/tasks",
        handler: function (request: Request, h: ResponseToolkit) {
          return "Hello World";
        },
      },
    ]);
  },
};

export default tasksRoutes;
