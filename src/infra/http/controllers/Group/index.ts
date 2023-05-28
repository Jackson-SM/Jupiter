import { FindAllGroupsByProjectCase } from "~/application/use-cases/groups/find-all-groups-by-project-case";
import { AddTaskInGroupController } from "./AddTaskInGroupController";
import { CreateGroupController } from "./CreateGroupController";
import { DeleteGroupController } from "./DeleteGroupController";
import { EditNameGroupController } from "./EditNameGroupController";
import { FindAllGroupsByProjectController } from "./FindAllGroupsByProjectController";
import { PrismaGroupRepository } from "~/infra/database/prisma/repositories/prisma-group-repository";
import { EditNameGroupCase } from "~/application/use-cases/groups/edit-name-group-case";
import { DeleteGroupCase } from "~/application/use-cases/groups/delete-group-case";
import { CreateGroupCase } from "~/application/use-cases/groups/create-group-case";
import { AddTaskInGroupCase } from "~/application/use-cases/groups/add-task-in-group-case";
import { MoveTaskInGroupController } from "./MoveTaskInGroupController";
import { MoveTaskInGroupCase } from "~/application/use-cases/groups/move-task-in-group-case";

const prismaGroupRepository = new PrismaGroupRepository();

const findAllGroupsByProjectCase = new FindAllGroupsByProjectCase(
  prismaGroupRepository,
);
const editNameGroupCase = new EditNameGroupCase(prismaGroupRepository);
const deleteGroupCase = new DeleteGroupCase(prismaGroupRepository);
const createGroupCase = new CreateGroupCase(prismaGroupRepository);
const addTaskInGroupCase = new AddTaskInGroupCase(prismaGroupRepository);
const moveTaskInGroupCase = new MoveTaskInGroupCase(prismaGroupRepository);

const findAllGroupsByProjectController = new FindAllGroupsByProjectController(
  findAllGroupsByProjectCase,
);
const editNameGroupController = new EditNameGroupController(editNameGroupCase);
const deleteGroupController = new DeleteGroupController(deleteGroupCase);
const createGroupController = new CreateGroupController(createGroupCase);
const addTaskInGroupController = new AddTaskInGroupController(
  addTaskInGroupCase,
);
const moveTaskInGroupController = new MoveTaskInGroupController(
  moveTaskInGroupCase,
);

export {
  findAllGroupsByProjectController,
  editNameGroupController,
  deleteGroupController,
  createGroupController,
  addTaskInGroupController,
  moveTaskInGroupController,
};
