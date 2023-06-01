import { CreateProjectCase } from "./create-project-case";
import { Project } from "~/domain/entities/Project/Project";
import { User } from "~/domain/entities/User/User";
import { FindProjectByLeadIdCase } from "./find-project-by-lead-id-case";
import { InMemoryProjectRepository } from "~/../tests/repositories/in-memory-project-repository";
import { makeUser } from "~/../tests/factories/makeUser";
import { makeProject } from "~/../tests/factories/makeProject";

describe("Find Project By LeadId Case", () => {
  let inMemoryProjectRepository: InMemoryProjectRepository;
  let createProjectCase: CreateProjectCase;
  let findProjectByLeadIdCase: FindProjectByLeadIdCase;
  let projectTesting: Project;
  let userTesting: User;

  beforeEach(async () => {
    inMemoryProjectRepository = new InMemoryProjectRepository();
    createProjectCase = new CreateProjectCase(inMemoryProjectRepository);
    findProjectByLeadIdCase = new FindProjectByLeadIdCase(
      inMemoryProjectRepository,
    );
    userTesting = makeUser();
    const { project } = await createProjectCase.execute(
      makeProject({ leadId: userTesting.id }),
    );
    projectTesting = project;
  });

  it("should return a project with leadId equal user id", async () => {
    const { projects } = await findProjectByLeadIdCase.execute({
      id: userTesting.id,
    });

    expect(projects).toHaveLength(1);
    expect(projects[0]).toEqual(projectTesting);
    expect(projects[0].leadId).toEqual(userTesting.id);
    expect(projects).toEqual(
      expect.arrayContaining([expect.objectContaining(projectTesting)]),
    );
  });
});
