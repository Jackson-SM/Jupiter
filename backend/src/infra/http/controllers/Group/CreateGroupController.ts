import { Request, ResponseToolkit } from "@hapi/hapi";
import { CreateGroupCase } from "~/application/use-cases/groups/create-group-case";
import { ICreateGroupBody } from "../../dtos/create-group-body";
import { GroupViewModel } from "../../view-models/group-view-model";

export class CreateGroupController {
  constructor(private createGroupCase: CreateGroupCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { name, projectId } = request.payload as ICreateGroupBody;

    const { group } = await this.createGroupCase.execute({ name, projectId });

    const groupFormatToHttp = GroupViewModel.toHttp(group);

    return h.response(groupFormatToHttp).code(201);
  };
}
