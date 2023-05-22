import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";
import {
  addParticipantInProjectController,
  createProjectController,
  findProjectByIdController,
} from "../controllers/Project";

const projectsRoutes = {
  name: "projects",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: "/v1/projects/",
        handler: createProjectController.handler,
      },
      {
        method: "POST",
        path: "/v1/projects/participants/",
        handler: addParticipantInProjectController.handler,
      },
      {
        method: "GET",
        path: "/v1/projects/{id}",
        handler: findProjectByIdController.handler,
      },
    ]);
  },
};

export default projectsRoutes;
