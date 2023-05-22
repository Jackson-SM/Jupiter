import { Request, ResponseToolkit } from "@hapi/hapi";
import { AddParticipantInProjectCase } from "~/application/use-cases/projects/add-participant-in-project-case";
import { AddParticipantInProjectBody } from "../../dtos/add-participant-in-project-body";

export class AddParticipantInProjectController {
  constructor(
    private addParticipantInProjectCase: AddParticipantInProjectCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { projectId, userId } =
      request.payload as AddParticipantInProjectBody;

    try {
      await this.addParticipantInProjectCase.execute({
        projectId,
        userId,
      });

      return h.response().code(201);
    } catch (err: any) {
      return h
        .response({ message: err.message, statusCode: err.output.statusCode })
        .code(err.output.statusCode);
    }
  };
}
