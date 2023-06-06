import { Request, ResponseToolkit } from "@hapi/hapi";
import { EditTaskCase } from "~/application/use-cases/tasks/edit-task-case";
import { IEditTaskBody } from "../../dtos/edit-task-body";

export class EditTaskController {
  constructor(private editTaskCase: EditTaskCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { title, description } = request.payload as IEditTaskBody;
    const { id } = request.params;

    await this.editTaskCase.execute({ taskId: id, description, title });

    return h.response().code(204);
  };
}
