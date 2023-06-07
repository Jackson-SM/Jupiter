import { Request, ResponseToolkit } from "@hapi/hapi";
import { RemoveResponsibleCase } from "~/application/use-cases/tasks/remove-responsible-case";

export class RemoveResponsibleController {
  constructor(private removeResponsibleCase: RemoveResponsibleCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { userId } = request.payload as { userId: string };
    const { id } = request.params;

    await this.removeResponsibleCase.execute({ userId, taskId: id });

    return h.response().code(204);
  };
}
