import { Request, ResponseToolkit, ServerExtType } from "@hapi/hapi";
import authService from "../../../application/services/AuthService";
import Boom from "@hapi/boom";

export const authMiddleware = (server, options) => {
  return {
    authenticate: async (request: Request, h: ResponseToolkit) => {
      const authorization = request.headers.authorization;
      try {
        if (!authorization) {
          throw Boom.unauthorized(null, "Bearer");
        }

        const token = authorization.split(" ")[1];
        const decoded = await authService.verifyToken(token);

        return h.authenticated({
          credentials: { id: decoded.id, email: decoded.email },
        });
      } catch (err) {
        console.log(err);
      }
    },
  };
};
