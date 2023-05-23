import { Request, ResponseToolkit } from "@hapi/hapi";
import { CreateTaskCase } from "~/application/use-cases/tasks/create-task-case";
import { CreateTaskBody } from "../../dtos/create-task-body";
import { TaskViewModel } from "../../view-models/task-view-model";

export class CreateTaskController {
  constructor(private createTaskCase: CreateTaskCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { title, description, projectId } = request.payload as CreateTaskBody;

    const { task } = await this.createTaskCase.execute({
      title,
      description,
      projectId,
    });

    const taskFormatHttp = TaskViewModel.toHttp(task);

    return h.response(taskFormatHttp).code(201);
  };
}
