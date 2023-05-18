import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";
import { authenticationLoginController } from "../controllers/Authentication";

const authRoutes = {
  name: "auths",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: "/v1/login/",
        handler: authenticationLoginController.handler,
        options: {
          auth: false,
        },
      },
    ]);
  },
};

export default authRoutes;
