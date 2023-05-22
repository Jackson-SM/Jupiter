import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindProjectByWorkspaceIdCase } from "~/application/use-cases/projects/find-project-by-workspace-id-case";

export class FindProjectByWorkspaceIdController {
  constructor(
    private findProjectByWorkspaceIdCase: FindProjectByWorkspaceIdCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    try {
      const { projects } = await this.findProjectByWorkspaceIdCase.execute({
        id: id,
      });

      return h.response(projects);
    } catch (err: any) {
      return h
        .response({ message: err.message, statusCode: err.output.statusCode })
        .code(err.output.statusCode);
    }
  };
}
