import { Request, ResponseToolkit } from "@hapi/hapi";
import { TaskViewModel } from "../../view-models/task-view-model";
import { FindTaskByProjectIdCase } from "~/application/use-cases/tasks/find-task-by-project-id-case";

export class FindTaskByProjectIdController {
  constructor(private findTaskByProjectIdCase: FindTaskByProjectIdCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { tasks } = await this.findTaskByProjectIdCase.execute({
      id: String(id),
    });

    const tasksFormatHttp = tasks.map((task) => TaskViewModel.toHttp(task));

    return h.response(tasksFormatHttp);
  };
}
