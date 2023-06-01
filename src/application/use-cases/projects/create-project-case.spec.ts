import { makeProject } from "~/../tests/factories/makeProject";
import { CreateProjectCase } from "./create-project-case";
import { FindProjectByIdCase } from "./find-project-by-id-case";
import { Project } from "~/domain/entities/Project/Project";
import { InMemoryProjectRepository } from "~/../tests/repositories/in-memory-project-repository";

describe("Create Project Case", () => {
  let inMemoryProjectRepository: InMemoryProjectRepository;
  let createProjectCase: CreateProjectCase;
  let findProjectByIdCase: FindProjectByIdCase;
  let projectTesting: Project;

  beforeEach(async () => {
    inMemoryProjectRepository = new InMemoryProjectRepository();
    createProjectCase = new CreateProjectCase(inMemoryProjectRepository);
    findProjectByIdCase = new FindProjectByIdCase(inMemoryProjectRepository);
    const { project } = await createProjectCase.execute(makeProject());
    projectTesting = project;
  });

  it("should create a new project", async () => {
    const { project } = await findProjectByIdCase.execute({
      id: projectTesting.id,
    });

    expect(project).toEqual(projectTesting);
    expect(project).toBeDefined();
  });
});
