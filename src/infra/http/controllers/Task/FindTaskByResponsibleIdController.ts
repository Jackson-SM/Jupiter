import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindTaskByResponsibleIdCase } from "~/application/use-cases/tasks/find-task-by-responsible-id-case";

export class FindTaskByResponsibleIdController {
  constructor(
    private findTaskByResponsibleIdCase: FindTaskByResponsibleIdCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { tasks } = await this.findTaskByResponsibleIdCase.execute({
      id: String(id),
    });

    return h.response(tasks);
  };
}
