import { CreateWorkspaceCase } from "~/application/use-cases/workspaces/create-workspace-case";
import { FindWorkspaceByIdCase } from "~/application/use-cases/workspaces/find-workspace-by-id-case";
import { PrismaWorkspaceRepository } from "~/infra/database/prisma/repositories/prisma-workspace-repository";
import { CreateWorkspaceController } from "./CreateWorkspaceController";
import { FindWorkspaceByIdController } from "./FindWorkspaceByIdController";

const repository = new PrismaWorkspaceRepository();

// Use Cases

const createWorkspaceCase = new CreateWorkspaceCase(repository);
const findWorkspaceByIdCase = new FindWorkspaceByIdCase(repository);

//Controllers

const createWorkspaceController = new CreateWorkspaceController(
  createWorkspaceCase,
);
const findWorkspaceByIdController = new FindWorkspaceByIdController(
  findWorkspaceByIdCase,
);

export { createWorkspaceController, findWorkspaceByIdController };
