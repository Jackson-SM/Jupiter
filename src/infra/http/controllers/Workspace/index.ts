import { CreateWorkspaceCase } from "~/application/use-cases/workspaces/create-workspace-case";
import { FindWorkspaceByIdCase } from "~/application/use-cases/workspaces/find-workspace-by-id-case";
import { PrismaWorkspaceRepository } from "~/infra/database/prisma/repositories/prisma-workspace-repository";
import { CreateWorkspaceController } from "./CreateWorkspaceController";
import { FindWorkspaceByIdController } from "./FindWorkspaceByIdController";
import { GetAllWorkspacesByCreatorIdCase } from "~/application/use-cases/workspaces/get-workspaces-by-creator-id-case";
import { GetAllWorkspaceByCreatorIdController } from "./GetAllWorkspaceByCreatorIdController";
import { RemoveWorkspaceController } from "./RemoveWorkspaceController";
import { RemoveWorkspaceCase } from "~/application/use-cases/workspaces/remove-workspace-case";

const repository = new PrismaWorkspaceRepository();

// Use Cases

const createWorkspaceCase = new CreateWorkspaceCase(repository);
const findWorkspaceByIdCase = new FindWorkspaceByIdCase(repository);
const getAllWorkspacesByCreatorIdCase = new GetAllWorkspacesByCreatorIdCase(
  repository,
);
const removeWorkspaceCase = new RemoveWorkspaceCase(repository);
//Controllers

const createWorkspaceController = new CreateWorkspaceController(
  createWorkspaceCase,
);
const findWorkspaceByIdController = new FindWorkspaceByIdController(
  findWorkspaceByIdCase,
);
const getAllWorkspacecByCretorIdController =
  new GetAllWorkspaceByCreatorIdController(getAllWorkspacesByCreatorIdCase);
const removeWorkspaceController = new RemoveWorkspaceController(
  removeWorkspaceCase,
);

export {
  createWorkspaceController,
  findWorkspaceByIdController,
  getAllWorkspacecByCretorIdController,
  removeWorkspaceController,
};
