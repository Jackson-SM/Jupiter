import { CreateWorkspaceCase } from "../../../../application/use-cases/workspaces/create-workspace-case";
import { ICreateWorkspaceBody } from "../../dtos/create-workspace-body";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { WorkspaceViewModel } from "../../view-models/workspace-view-model";

export class CreateWorkspaceController {
  constructor(private createWorkspaceCase: CreateWorkspaceCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { title, description } = request.payload as ICreateWorkspaceBody;
    const { id } = request.auth.credentials;

    try {
      const { workspace } = await this.createWorkspaceCase.execute({
        title,
        description,
        creatorId: String(id),
      });

      return h.response(await WorkspaceViewModel.toHttp(workspace)).code(201);
    } catch (err: any) {
      return h
        .response({ message: err.message, statusCode: err.output.statusCode })
        .code(err.output.statusCode);
    }
  };
}
