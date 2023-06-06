import { Request, ResponseToolkit } from "@hapi/hapi";
import { IMoveTaskInGroupBody } from "../../dtos/move-task-in-group-body";
import { MoveTaskInGroupCase } from "~/application/use-cases/tasks/move-task-in-group-case";

export class MoveTaskInGroupController {
  constructor(private moveTaskInGroupCase: MoveTaskInGroupCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { groupId } = request.payload as IMoveTaskInGroupBody;
    const { id } = request.params;

    await this.moveTaskInGroupCase.execute({
      newGroup: groupId,
      taskId: id,
    });

    return h.response().code(204);
  };
}
