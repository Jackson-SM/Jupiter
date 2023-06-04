import { Request, ResponseToolkit } from "@hapi/hapi";
import { RemoveProjectCase } from "~/application/use-cases/projects/remove-project-case";

export class RemoveProjectController {
  constructor(private removeProjectCase: RemoveProjectCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    await this.removeProjectCase.execute(id);

    return h.response().code(204);
  };
}
