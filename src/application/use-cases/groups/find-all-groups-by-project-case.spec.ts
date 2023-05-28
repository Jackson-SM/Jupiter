import { CreateGroupCase } from "./create-group-case";
import { InMemoryGroupRepository } from "tests/repositories/in-memory-group-repository";
import { makeGroup } from "tests/factories/makeGroup";
import { Group } from "~/domain/entities/Group/Group";
import { Project } from "~/domain/entities/Project/Project";
import { makeProject } from "tests/factories/makeProject";
import { FindAllGroupsByProjectCase } from "./find-all-groups-by-project-case";

describe("Find All Groups By Project Group Case", () => {
  let inMemoryGroupRepository: InMemoryGroupRepository;
  let createGroupCase: CreateGroupCase;
  let findAllGroupsByProject: FindAllGroupsByProjectCase;
  let groupTesting: Group;
  let projectTesting: Project;

  beforeEach(async () => {
    inMemoryGroupRepository = new InMemoryGroupRepository();
    createGroupCase = new CreateGroupCase(inMemoryGroupRepository);
    findAllGroupsByProject = new FindAllGroupsByProjectCase(
      inMemoryGroupRepository,
    );
    projectTesting = makeProject();
    const { group } = await createGroupCase.execute(
      makeGroup({ projectId: projectTesting.id }),
    );
    await createGroupCase.execute(makeGroup({ projectId: projectTesting.id }));
    await createGroupCase.execute(makeGroup({ projectId: projectTesting.id }));
    await createGroupCase.execute(makeGroup({ projectId: makeProject().id }));
    groupTesting = group;
  });

  it("should find groups by project", async () => {
    const { groups } = await findAllGroupsByProject.execute({
      projectId: projectTesting.id,
    });

    expect(groupTesting).toBeInstanceOf(Group);
    expect(groups).toHaveLength(3);
    expect(groups).toEqual(
      expect.arrayContaining([expect.objectContaining(groupTesting)]),
    );
  });
});
