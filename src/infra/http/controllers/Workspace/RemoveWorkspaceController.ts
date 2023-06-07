import { Request, ResponseToolkit } from "@hapi/hapi";
import { RemoveWorkspaceCase } from "~/application/use-cases/workspaces/remove-workspace-case";

export class RemoveWorkspaceController {
  constructor(private removeWorkspaceCase: RemoveWorkspaceCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    await this.removeWorkspaceCase.execute(id);

    return h.response().code(204);
  };
}
