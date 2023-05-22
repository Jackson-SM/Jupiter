import { Request, ResponseToolkit } from "@hapi/hapi";

export const errorHandlingExtension = async (
  request: Request,
  h: ResponseToolkit,
) => {
  try {
    return await h.continue;
  } catch (err: any) {
    return h
      .response({ message: err.message, statusCode: err.output.statusCode })
      .code(err.output.statusCode);
  }
};
