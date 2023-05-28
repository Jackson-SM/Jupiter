import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindTaskByGroupIdCase } from "~/application/use-cases/tasks/find-task-by-group-id";
import { TaskViewModel } from "../../view-models/task-view-model";

export class FindTaskByGroupIdController {
  constructor(private findTaskByGroupIdCase: FindTaskByGroupIdCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { tasks } = await this.findTaskByGroupIdCase.execute({
      id: id,
    });

    const tasksFormatToHttp = tasks.map((task) => TaskViewModel.toHttp(task));

    return h.response(tasksFormatToHttp).code(200);
  };
}
