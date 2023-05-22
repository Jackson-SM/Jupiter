import { Request, ResponseToolkit } from "@hapi/hapi";
import { GetAllWorkspacesByCreatorIdCase } from "~/application/use-cases/workspaces/get-workspaces-by-creator-id-case";
import { WorkspaceViewModel } from "../../view-models/workspace-view-model";

export class GetAllWorkspaceByCreatorIdController {
  constructor(
    private getAllWorkspaceByCreatorIdCase: GetAllWorkspacesByCreatorIdCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    try {
      const { workspaces } = await this.getAllWorkspaceByCreatorIdCase.execute({
        creatorId: id,
      });

      const workspacesFormat = await Promise.all(
        workspaces.map(async (workspace) => {
          return await WorkspaceViewModel.toHttp(workspace);
        }),
      );

      return h.response(workspacesFormat);
    } catch (err: any) {
      return h
        .response({ message: err.message, statusCode: err.output.statusCode })
        .code(err.output.statusCode);
    }
  };
}
