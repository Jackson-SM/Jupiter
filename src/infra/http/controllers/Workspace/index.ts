import { CreateWorkspaceCase } from "~/application/use-cases/workspaces/create-workspace-case";
import { FindWorkspaceByIdCase } from "~/application/use-cases/workspaces/find-workspace-by-id-case";
import { PrismaWorkspaceRepository } from "~/infra/database/prisma/repositories/prisma-workspace-repository";
import { CreateWorkspaceController } from "./CreateWorkspaceController";
import { FindWorkspaceByIdController } from "./FindWorkspaceByIdController";
import { GetAllWorkspacesByCreatorIdCase } from "~/application/use-cases/workspaces/get-workspaces-by-creator-id-case";
import { GetAllWorkspaceByCreatorIdController } from "./GetAllWorkspaceByCreatorIdController";

const repository = new PrismaWorkspaceRepository();

// Use Cases

const createWorkspaceCase = new CreateWorkspaceCase(repository);
const findWorkspaceByIdCase = new FindWorkspaceByIdCase(repository);
const getAllWorkspacesByCreatorIdCase = new GetAllWorkspacesByCreatorIdCase(
  repository,
);
//Controllers

const createWorkspaceController = new CreateWorkspaceController(
  createWorkspaceCase,
);
const findWorkspaceByIdController = new FindWorkspaceByIdController(
  findWorkspaceByIdCase,
);
const getAllWorkspacecByCretorIdController =
  new GetAllWorkspaceByCreatorIdController(getAllWorkspacesByCreatorIdCase);

export {
  createWorkspaceController,
  findWorkspaceByIdController,
  getAllWorkspacecByCretorIdController,
};
