import { Request, ResponseToolkit } from "@hapi/hapi";
import { ICreateProjectBody } from "../../dtos/create-project-body";
import { CreateProjectCase } from "~/application/use-cases/projects/create-project-case";
import { ProjectViewModel } from "../../view-models/project-view-model";

export class CreateProjectController {
  constructor(private createProjectCase: CreateProjectCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { title, description, leadId, workspaceId } =
      request.payload as ICreateProjectBody;

    const { project } = await this.createProjectCase.execute({
      title,
      description,
      leadId,
      workspaceId,
    });

    const projectFormatToHttp = ProjectViewModel.toHttp(project);

    return h.response(projectFormatToHttp).code(201);
  };
}
