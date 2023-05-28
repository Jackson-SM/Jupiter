import { Request, ResponseToolkit } from "@hapi/hapi";
import { AddTaskInGroupCase } from "~/application/use-cases/groups/add-task-in-group-case";
import { IAddParticipantInProjectBody } from "../../dtos/add-task-in-group-body";

export class AddTaskInGroupController {
  constructor(private addTaskInGroupCase: AddTaskInGroupCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { groupId, taskId } = request.payload as IAddParticipantInProjectBody;

    await this.addTaskInGroupCase.execute({ groupId, taskId });

    return h.response().code(204);
  };
}
