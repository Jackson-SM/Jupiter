import { Request, ResponseToolkit } from "@hapi/hapi";
import { AddTaskResponsibleCase } from "~/application/use-cases/tasks/add-task-responsible-case";
import { AddTaskResponsibleBody } from "../../dtos/add-task-responsible-body";

export class AddTaskResponsibleController {
  constructor(private addTaskResponsibleCase: AddTaskResponsibleCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { userId, taskId } = request.payload as AddTaskResponsibleBody;

    await this.addTaskResponsibleCase.execute({
      taskId,
      userId,
    });

    return h.response().code(201);
  };
}
