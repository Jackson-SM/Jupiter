import { Request, ResponseToolkit } from "@hapi/hapi";
import { RemoveParticipantInProjectCase } from "~/application/use-cases/projects/remove-participant-in-project-case";
import { IRmoveParticipantInProjectBody } from "../../dtos/removeParticipantInProjectBody";

export class RemoveParticipantInProjectController {
  constructor(
    private removeParticipantInProjectCase: RemoveParticipantInProjectCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { projectId, userId } =
      request.payload as IRmoveParticipantInProjectBody;

    await this.removeParticipantInProjectCase.execute({
      projectId,
      userId,
    });

    return h.response().code(204);
  };
}
