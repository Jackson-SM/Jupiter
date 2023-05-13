import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";

const projectsRoutes = {
  name: "projects",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/projects",
        handler: function (request: Request, h: ResponseToolkit) {
          return "Hello World";
        },
      },
    ]);
  },
};

export default projectsRoutes;
