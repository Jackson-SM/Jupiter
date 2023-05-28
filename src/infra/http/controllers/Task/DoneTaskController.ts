import { Request, ResponseToolkit } from "@hapi/hapi";
import { DoneTaskCase } from "~/application/use-cases/tasks/done-task-case";

export class DoneTaskController {
  constructor(private doneTaskCase: DoneTaskCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    await this.doneTaskCase.execute({
      id: id,
    });

    return h.response().code(204);
  };
}
