import { GroupRepository } from "~/domain/repositories/GroupRepository";

interface CreateGroupCaseRequest {
  id: string;
  name: string;
}

export class EditNameGroupCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute(request: CreateGroupCaseRequest): Promise<void> {
    const { id, name } = request;

    await this.groupRepository.editNameGroup(id, name);
  }
}
