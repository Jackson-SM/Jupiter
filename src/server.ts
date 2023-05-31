import Hapi from "@hapi/hapi";
import {
  users,
  workspaces,
  projects,
  tasks,
  comments,
  auth,
  groups,
} from "./infra/http/routes/routes";
import prisma from "./infra/database/prisma/client/prisma";
import { authMiddleware } from "./infra/http/middlewares/authMiddleware";
import { errorHandlingExtension } from "./infra/http/middlewares/errorHandlingExtension";

export const server: Hapi.Server = Hapi.server({
  port: 3000,
  host: "localhost",
  routes: {
    cors: {
      origin: [`${process.env.URL_CORS_MAIN}`],
    },
  },
});

export async function start(): Promise<Hapi.Server> {
  server.auth.scheme("bearer", authMiddleware);
  server.auth.strategy("default", "bearer");
  server.auth.default("default");
  server.ext("onPreHandler", errorHandlingExtension);
  await server.register([
    users,
    workspaces,
    projects,
    tasks,
    comments,
    groups,
    auth,
  ]);
  await server.start();
  return server;
}

process.on("unhandledRejection", (err) => {
  prisma.$disconnect();
  console.log(err);
  process.exit(1);
});

start().then((server) => {
  console.log(`Server Is Running in ${server.info.uri}`);
});
