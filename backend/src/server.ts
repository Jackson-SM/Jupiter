import Hapi from "@hapi/hapi";
import prisma from "./infra/database/prisma/client/prisma";
import { authMiddleware } from "./infra/http/middlewares/authMiddleware";
import { errorHandlingExtension } from "./infra/http/middlewares/errorHandlingExtension";
import {
  auth,
  comments,
  groups,
  projects,
  tasks,
  users,
  workspaces,
} from "./infra/http/routes/routes";

export const server: Hapi.Server = Hapi.server({
  port: 3334,
  host: "0.0.0.0",
  routes: {
    cors: {
      origin: [`${process.env.URL_CORS_MAIN}`],
      credentials: true,
    },
  },
});

export async function start(): Promise<Hapi.Server> {
  server.auth.scheme("bearer", authMiddleware);
  server.auth.strategy("default", "bearer");
  server.auth.default("default");
  server.ext("onPreHandler", errorHandlingExtension);
  await server.register(
    [users, workspaces, projects, tasks, comments, groups, auth],
    { routes: { prefix: "/api" } },
  );
  await server.start();
  return server;
}

process.on("unhandledRejection", (err) => {
  prisma.$disconnect();
  console.log(err);
  server.stop();
  process.exit(1);
});

start().then((server) => {
  console.log(`Server Is Running in ${server.info.uri}`);
});
