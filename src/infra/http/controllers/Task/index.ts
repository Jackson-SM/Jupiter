import { CreateTaskCase } from "~/application/use-cases/tasks/create-task-case";
import { PrismaTaskRepository } from "~/infra/database/prisma/repositories/prisma-task-repository";
import { CreateTaskController } from "./CreateTaskController";
import { AddTaskResponsibleController } from "./AddTaskResponsibleController";
import { AddTaskResponsibleCase } from "~/application/use-cases/tasks/add-task-responsible-case";

const prismaTaskRepository = new PrismaTaskRepository();

const createTaskCase = new CreateTaskCase(prismaTaskRepository);
const addTaskResponsibleCase = new AddTaskResponsibleCase(prismaTaskRepository);

const createTaskController = new CreateTaskController(createTaskCase);
const addTaskResponsibleController = new AddTaskResponsibleController(
  addTaskResponsibleCase,
);

export { createTaskController, addTaskResponsibleController };
