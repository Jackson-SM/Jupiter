import Hapi from "@hapi/hapi";
import {
  users,
  workspaces,
  projects,
  tasks,
  comments,
} from "./infra/http/routes/routes";
import prisma from "./infra/http/plugins/prisma";

const server: Hapi.Server = Hapi.server({
  port: 3000,
  host: "localhost",
});

export async function start(): Promise<Hapi.Server> {
  await server.register([prisma, users, workspaces, projects, tasks, comments]);
  await server.start();
  return server;
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

start().then((server) => {
  console.log(`Server Is Running in ${server.info.uri}`);
});
