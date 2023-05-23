import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindTaskByIdCase } from "~/application/use-cases/tasks/find-task-by-id-case";
import { TaskViewModel } from "../../view-models/task-view-model";

export class FindTaskByIdController {
  constructor(private findTaskByIdCase: FindTaskByIdCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { task } = await this.findTaskByIdCase.execute({
      id: String(id),
    });

    const taskFormatHttp = TaskViewModel.toHttp(task);

    return h.response(taskFormatHttp);
  };
}
