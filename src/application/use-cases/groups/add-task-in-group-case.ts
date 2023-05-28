import { Group } from "~/domain/entities/Group/Group";
import { GroupRepository } from "~/domain/repositories/GroupRepository";

interface AddTaskInGroupCaseRequest {
  taskId: string;
  groupId: string;
}

export class AddTaskInGroupCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute(request: AddTaskInGroupCaseRequest): Promise<void> {
    const { taskId, groupId } = request;

    await this.groupRepository.addTaskInGroup(taskId, groupId);
  }
}
