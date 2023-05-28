import { Group } from "~/domain/entities/Group/Group";
import { GroupRepository } from "~/domain/repositories/GroupRepository";
import prisma from "../client/prisma";

export class PrismaGroupRepository implements GroupRepository {
  addTaskInGroup(taskId: string, groupId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removeTaskInGroup(taskId: string, groupId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAllGroupsByProject(): Promise<Group[]> {
    throw new Error("Method not implemented.");
  }
  editGroup(groupId: string, group: Group): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteGroup(groupId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createGroup(group: Group): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
