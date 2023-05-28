import { Request, ResponseToolkit } from "@hapi/hapi";
import { MoveTaskInGroupCase } from "~/application/use-cases/groups/move-task-in-group-case";
import { IMoveTaskInGroupBody } from "../../dtos/move-task-in-group-body";

export class MoveTaskInGroupController {
  constructor(private moveTaskInGroupCase: MoveTaskInGroupCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { newGroupId, taskId } = request.payload as IMoveTaskInGroupBody;

    await this.moveTaskInGroupCase.execute({ newGroup: newGroupId, taskId });

    return h.response().code(204);
  };
}
