import dotenv from "dotenv";
dotenv.config();
import { Request, ResponseToolkit, ServerExtType } from "@hapi/hapi";
import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import { JwtPayload } from "~/application/services/AuthenticationService";

export const authMiddleware = (server, options) => {
  return {
    authenticate: async (request: Request, h: ResponseToolkit) => {
      const authorization = request.headers.authorization;

      console.log(authorization);
      try {
        if (!authorization) {
          throw Boom.unauthorized(null, "Bearer");
        }

        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(
          token,
          process.env.SECRET_KEY!,
        ) as JwtPayload;

        return h.authenticated({
          credentials: { id: decoded.id, email: decoded.email },
        });
      } catch (err) {
        throw Boom.unauthorized("Erro de autenticação inesperado");
      }
    },
  };
};
