import { Group } from "~/domain/entities/Group/Group";
import { GroupRepository } from "~/domain/repositories/GroupRepository";

interface CreateGroupCaseRequest {
  name: string;
  projectId: string;
}
interface CreateGroupCaseResponse {
  group: Group;
}

export class CreateGroupCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute(
    request: CreateGroupCaseRequest,
  ): Promise<CreateGroupCaseResponse> {
    const { name, projectId } = request;

    const group = new Group({ name, projectId });

    await this.groupRepository.createGroup(group);

    return {
      group,
    };
  }
}
