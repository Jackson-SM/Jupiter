import { Request, ResponseToolkit } from "@hapi/hapi";
import { RemoveTaskCase } from "~/application/use-cases/tasks/remove-task-case";

export class RemoveTaskController {
  constructor(private removeTaskCase: RemoveTaskCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    await this.removeTaskCase.execute(id);

    return h.response().code(204);
  };
}
