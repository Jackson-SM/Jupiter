import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindAllProjectParticipantingByUserCase } from "~/application/use-cases/projects/find-all-project-participanting-by-user-case";
import { ProjectViewModel } from "../../view-models/project-view-model";

export class FindAllProjectParticipantingByUserController {
  constructor(
    private findAllProjectParticipantingByUserCase: FindAllProjectParticipantingByUserCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { projects } =
      await this.findAllProjectParticipantingByUserCase.execute({
        userId: id,
      });

    const formatProjectViewModel = projects.map((user) =>
      ProjectViewModel.toHttp(user),
    );

    return h.response(formatProjectViewModel);
  };
}
