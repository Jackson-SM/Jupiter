import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";

const workspacesRoutes = {
  name: "workspaces",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/v1/workspaces",
        handler: function (request: Request, h: ResponseToolkit) {
          return "Hello World";
        },
      },
    ]);
  },
};

export default workspacesRoutes;
