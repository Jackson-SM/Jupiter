import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindAllGroupsByProjectCase } from "~/application/use-cases/groups/find-all-groups-by-project-case";
import { GroupViewModel } from "../../view-models/group-view-model";

export class FindAllGroupsByProjectController {
  constructor(private findAllGroupsByProjectCase: FindAllGroupsByProjectCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { groups } = await this.findAllGroupsByProjectCase.execute({
      projectId: id,
    });

    const groupsToHttp = groups.map((group) => GroupViewModel.toHttp(group));

    return h.response(groupsToHttp).code(200);
  };
}
