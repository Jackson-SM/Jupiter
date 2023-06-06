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

const prismaGroupRepository = new PrismaGroupRepository();

const findAllGroupsByProjectCase = new FindAllGroupsByProjectCase(
  prismaGroupRepository,
);
const editNameGroupCase = new EditNameGroupCase(prismaGroupRepository);
const deleteGroupCase = new DeleteGroupCase(prismaGroupRepository);
const createGroupCase = new CreateGroupCase(prismaGroupRepository);

const findAllGroupsByProjectController = new FindAllGroupsByProjectController(
  findAllGroupsByProjectCase,
);
const editNameGroupController = new EditNameGroupController(editNameGroupCase);
const deleteGroupController = new DeleteGroupController(deleteGroupCase);
const createGroupController = new CreateGroupController(createGroupCase);

export {
  findAllGroupsByProjectController,
  editNameGroupController,
  deleteGroupController,
  createGroupController,
};
