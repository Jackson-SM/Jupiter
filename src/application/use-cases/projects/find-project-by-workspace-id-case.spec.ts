import { InMemoryProjectRepository } from "tests/repositories/in-memory-project-repository";
import { CreateProjectCase } from "./create-project-case";
import { makeProject } from "tests/factories/makeProject";
import { Project } from "~/domain/entities/Project/Project";
import { FindProjectByWorkspaceIdCase } from "./find-project-by-workspace-id-case";
import { Workspace } from "~/domain/entities/Workspaces/Workspace";
import { makeWorkspace } from "tests/factories/makeWorkspace";

describe("Find Project By WorkspaceId Case", () => {
  let inMemoryProjectRepository: InMemoryProjectRepository;
  let createProjectCase: CreateProjectCase;
  let findProjectByWorkspaceIdCase: FindProjectByWorkspaceIdCase;
  let projectTesting: Project;
  let workspaceTesting: Workspace;

  beforeEach(async () => {
    inMemoryProjectRepository = new InMemoryProjectRepository();
    createProjectCase = new CreateProjectCase(inMemoryProjectRepository);
    findProjectByWorkspaceIdCase = new FindProjectByWorkspaceIdCase(
      inMemoryProjectRepository,
    );
    workspaceTesting = makeWorkspace();
    const { project } = await createProjectCase.execute(
      makeProject({ workspaceId: workspaceTesting.id }),
    );
    projectTesting = project;
  });

  it("should return a project with leadId equal user id", async () => {
    const { projects } = await findProjectByWorkspaceIdCase.execute({
      id: workspaceTesting.id,
    });

    expect(projects).toHaveLength(1);
    expect(projects[0]).toEqual(projectTesting);
    expect(projects[0].workspaceId).toEqual(workspaceTesting.id);
    expect(projects).toEqual(
      expect.arrayContaining([expect.objectContaining(projectTesting)]),
    );
  });
});
