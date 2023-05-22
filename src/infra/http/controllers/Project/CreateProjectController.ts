import { Request, ResponseToolkit } from "@hapi/hapi";
import { ICreateProjectBody } from "../../dtos/create-project-body";
import { CreateProjectCase } from "~/application/use-cases/projects/create-project-case";

export class CreateProjectController {
  constructor(private createProjectCase: CreateProjectCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { title, description, leadId, workspaceId } =
      request.payload as ICreateProjectBody;

    try {
      const { project } = await this.createProjectCase.execute({
        title,
        description,
        leadId,
        workspaceId,
      });

      h.response(project).code(201);
    } catch (err: any) {
      return h
        .response({ message: err.message, statusCode: err.output.statusCode })
        .code(err.output.statusCode);
    }
  };
}
