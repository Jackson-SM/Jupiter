import { CreateProjectCase } from "./create-project-case";
import { FindProjectByIdCase } from "./find-project-by-id-case";
import { Project } from "~/domain/entities/Project/Project";
import { RemoveProjectCase } from "./remove-project-case";
import { InMemoryProjectRepository } from "~/../tests/repositories/in-memory-project-repository";
import { makeProject } from "~/../tests/factories/makeProject";

describe("Remove Project Case", () => {
  let inMemoryProjectRepository: InMemoryProjectRepository;
  let createProjectCase: CreateProjectCase;
  let findProjectByIdCase: FindProjectByIdCase;
  let projectTesting: Project;
  let removeProjectCase: RemoveProjectCase;

  beforeEach(async () => {
    inMemoryProjectRepository = new InMemoryProjectRepository();
    createProjectCase = new CreateProjectCase(inMemoryProjectRepository);
    findProjectByIdCase = new FindProjectByIdCase(inMemoryProjectRepository);
    removeProjectCase = new RemoveProjectCase(inMemoryProjectRepository);
    const { project } = await createProjectCase.execute(makeProject());
    projectTesting = project;
  });

  it("should remove a project by id", async () => {
    await removeProjectCase.execute(projectTesting.id);

    await expect(
      findProjectByIdCase.execute({
        id: projectTesting.id,
      }),
    ).rejects.toThrow();
  });
});
