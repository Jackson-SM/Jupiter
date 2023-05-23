import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindAllParticipantsByProjectIdCase } from "~/application/use-cases/projects/find-all-participants-by-project-id-case";
import { UserViewModel } from "../../view-models/user-view-model";

export class FindAllParticipantsByProjectIdController {
  constructor(
    private findAllParticipantsByProjectIdCase: FindAllParticipantsByProjectIdCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { users } = await this.findAllParticipantsByProjectIdCase.execute({
      projectId: id,
    });

    const formatUsersViewModel = users.map((user) =>
      UserViewModel.toHttp(user),
    );

    return h.response(formatUsersViewModel);
  };
}
