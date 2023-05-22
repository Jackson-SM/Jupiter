import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindProjectByIdCase } from "~/application/use-cases/projects/find-project-by-id-case";

export class FindProjectByIdController {
  constructor(private findProjectByIdCase: FindProjectByIdCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    try {
      const { project } = await this.findProjectByIdCase.execute({
        id: id,
      });

      return h.response(project);
    } catch (err: any) {
      return h
        .response({ message: err.message, statusCode: err.output.statusCode })
        .code(err.output.statusCode);
    }
  };
}
