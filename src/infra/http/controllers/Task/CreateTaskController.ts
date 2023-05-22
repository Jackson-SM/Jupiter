import { Request, ResponseToolkit } from "@hapi/hapi";
import { CreateTaskCase } from "~/application/use-cases/tasks/create-task-case";
import { CreateTaskBody } from "../../dtos/create-task-body";

export class CreateTaskController {
  constructor(private createTaskCase: CreateTaskCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { title, description, projectId } = request.payload as CreateTaskBody;

    const task = await this.createTaskCase.execute({
      title,
      description,
      projectId,
    });

    return h.response(task).code(201);
  };
}
