import { GroupRepository } from "~/domain/repositories/GroupRepository";

interface MoveTaskInGroupCaseRequest {
  taskId: string;
  newGroup: string;
}

export class MoveTaskInGroupCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute(request: MoveTaskInGroupCaseRequest): Promise<void> {
    const { taskId, newGroup } = request;

    await this.groupRepository.moveTaskGroup(newGroup, taskId);
  }
}
