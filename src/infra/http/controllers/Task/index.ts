import { CreateTaskCase } from "~/application/use-cases/tasks/create-task-case";
import { PrismaTaskRepository } from "~/infra/database/prisma/repositories/prisma-task-repository";
import { CreateTaskController } from "./CreateTaskController";

const prismaTaskRepository = new PrismaTaskRepository();

const createTaskCase = new CreateTaskCase(prismaTaskRepository);

const createTaskController = new CreateTaskController(createTaskCase);

export { createTaskController };
