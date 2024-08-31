import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindProjectByLeadIdCase } from "~/application/use-cases/projects/find-project-by-lead-id-case";
import { ProjectViewModel } from "../../view-models/project-view-model";

export class FindProjectByLeadIdController {
  constructor(private findProjectByLeadIdCase: FindProjectByLeadIdCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { projects } = await this.findProjectByLeadIdCase.execute({
      id: id,
    });

    const formatProjectsToHttp = projects.map((project) =>
      ProjectViewModel.toHttp(project),
    );

    return h.response(formatProjectsToHttp);
  };
}
