import { Group } from "~/domain/entities/Group/Group";
import { GroupRepository } from "~/domain/repositories/GroupRepository";

interface FindAllGroupsByProjectCaseRequest {
  projectId: string;
}
interface FindAllGroupsByProjectCaseResponse {
  groups: Group[];
}

export class FindAllGroupsByProjectCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute(
    request: FindAllGroupsByProjectCaseRequest,
  ): Promise<FindAllGroupsByProjectCaseResponse> {
    const { projectId } = request;

    const groups = await this.groupRepository.findAllGroupsByProject(projectId);

    return {
      groups,
    };
  }
}
