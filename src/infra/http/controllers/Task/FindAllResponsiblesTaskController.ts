import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindAllResponsiblesTaskCase } from "~/application/use-cases/tasks/find-all-responsibles-task-case";
import { UserViewModel } from "../../view-models/user-view-model";

export class FindAllResponsiblesTaskController {
  constructor(
    private findAllResponsiblesTaskCase: FindAllResponsiblesTaskCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { users } = await this.findAllResponsiblesTaskCase.execute({
      id: id,
    });

    const usersFormat = users.map((user) => UserViewModel.toHttp(user));

    return h.response(usersFormat).code(200);
  };
}
