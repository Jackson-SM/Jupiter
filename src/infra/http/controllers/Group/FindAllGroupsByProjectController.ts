import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindAllGroupsByProjectCase } from "~/application/use-cases/groups/find-all-groups-by-project-case";

export class FindAllGroupsByProjectController {
  constructor(private findAllGroupsByProjectCase: FindAllGroupsByProjectCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    await this.findAllGroupsByProjectCase.execute({ projectId: id });

    return h.response().code(204);
  };
}
