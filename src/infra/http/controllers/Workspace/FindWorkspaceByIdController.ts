import { Request, ResponseToolkit } from "@hapi/hapi";
import { WorkspaceRepository } from "../../../../domain/repositories/WorkspaceRepository";
import { FindWorkspaceByIdCase } from "~/application/use-cases/workspaces/find-workspace-by-id-case";
import { WorkspaceViewModel } from "../../view-models/workspace-view-model";

export class FindWorkspaceByIdController {
  constructor(private findWorkspaceByIdCase: FindWorkspaceByIdCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params as { id: string };

    try {
      const { workspace } = await this.findWorkspaceByIdCase.execute({
        id: id,
      });

      return WorkspaceViewModel.toHttp(workspace);
    } catch (err: any) {
      return h.response({ message: err.message }).code(err.statusCode);
    }
  };
}
