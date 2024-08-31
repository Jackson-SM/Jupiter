import { GroupRepository } from "~/domain/repositories/GroupRepository";

interface CreateGroupCaseRequest {
  id: string;
}

export class DeleteGroupCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute(request: CreateGroupCaseRequest): Promise<void> {
    const { id } = request;

    await this.groupRepository.deleteGroup(id);
  }
}
