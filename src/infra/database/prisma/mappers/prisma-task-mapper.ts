import { Task as RawTask } from "@prisma/client";
import { Task } from "../../../../domain/entities/Task/Task";

export class PrismaTaskMapper {
  static toDomain(task: RawTask): Task {
    return new Task(
      {
        title: task.title,
        description: task.description,
        groupId: task.groupId,
        doneDate: task.doneDate,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
      task.id,
    );
  }

  static toPrisma(task: Task): RawTask {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      groupId: task.groupId,
      doneDate: task.doneDate,
      createdAt: task.createdAt,
      updatedAt: task.createdAt,
    };
  }
}
