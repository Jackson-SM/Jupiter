import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindProjectByWorkspaceIdCase } from "~/application/use-cases/projects/find-project-by-workspace-id-case";

export class FindProjectByWorkspaceIdController {
  constructor(
    private findProjectByWorkspaceIdCase: FindProjectByWorkspaceIdCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { projects } = await this.findProjectByWorkspaceIdCase.execute({
      id: id,
    });

    return h.response(projects);
  };
}
