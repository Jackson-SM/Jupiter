import { Request, ResponseToolkit } from "@hapi/hapi";
import { ICreateProjectBody } from "../../dtos/create-project-body";
import { CreateProjectCase } from "~/application/use-cases/projects/create-project-case";

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

    return h.response(project).code(201);
  };
}
