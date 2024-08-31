import { Request, ResponseToolkit } from "@hapi/hapi";
import { DeleteGroupCase } from "~/application/use-cases/groups/delete-group-case";

export class DeleteGroupController {
  constructor(private deleteGroupCase: DeleteGroupCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    await this.deleteGroupCase.execute({ id });

    return h.response().code(204);
  };
}
