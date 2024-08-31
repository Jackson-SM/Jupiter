import { Request, ResponseToolkit } from "@hapi/hapi";
import { EditNameGroupCase } from "~/application/use-cases/groups/edit-name-group-case";

export class EditNameGroupController {
  constructor(private editNameGroupCase: EditNameGroupCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;
    const { name } = request.payload as { name: string };

    await this.editNameGroupCase.execute({ id, name });

    return h.response().code(204);
  };
}
