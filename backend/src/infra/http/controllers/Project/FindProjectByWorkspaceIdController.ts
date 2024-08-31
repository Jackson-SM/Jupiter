import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindProjectByWorkspaceIdCase } from "~/application/use-cases/projects/find-project-by-workspace-id-case";
import { ProjectViewModel } from "../../view-models/project-view-model";

export class FindProjectByWorkspaceIdController {
  constructor(
    private findProjectByWorkspaceIdCase: FindProjectByWorkspaceIdCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { projects } = await this.findProjectByWorkspaceIdCase.execute({
      id: id,
    });

    const projectsFormatToHttp = projects.map((project) =>
      ProjectViewModel.toHttp(project),
    );

    return h.response(projectsFormatToHttp);
  };
}
