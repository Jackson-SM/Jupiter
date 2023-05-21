import { CreateTaskCase } from "./create-task-case";
import { InMemoryTaskRepository } from "tests/repositories/in-memory-task-repository";
import { makeTask } from "tests/factories/makeTask";
import { Task } from "~/domain/entities/Task/Task";
import { FindTaskByProjectIdCase } from "./find-task-by-project-id-case";
import { Project } from "~/domain/entities/Project/Project";
import { makeProject } from "tests/factories/makeProject";

describe("Find Task By Project Id Case", () => {
  let inMemoryTaskRepository: InMemoryTaskRepository;
  let createTaskCase: CreateTaskCase;
  let findTaskByProjectIdCase: FindTaskByProjectIdCase;
  let taskTesting: Task;
  let projectTesting: Project;

  beforeEach(async () => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    createTaskCase = new CreateTaskCase(inMemoryTaskRepository);
    findTaskByProjectIdCase = new FindTaskByProjectIdCase(
      inMemoryTaskRepository,
    );
    projectTesting = makeProject();
    const { task } = await createTaskCase.execute(
      makeTask({ projectId: projectTesting.id }),
    );
    taskTesting = task;
  });

  it("should to find a Task with project id equal project testing", async () => {
    const { tasks } = await findTaskByProjectIdCase.execute({
      id: projectTesting.id,
    });

    expect(tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ projectId: projectTesting.id }),
      ]),
    );
    expect(tasks[0].projectId).toEqual(projectTesting.id);
  });
});
