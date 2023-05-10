import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";

const init = async () => {
  const server: Server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.start().then();
  console.log(`Server is Running on: ${server.info.uri}`);
};

init();
