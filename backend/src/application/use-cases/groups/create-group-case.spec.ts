import { InMemoryGroupRepository } from "~/../tests/repositories/in-memory-group-repository";
import { CreateGroupCase } from "./create-group-case";
import { Group } from "~/domain/entities/Group/Group";
import { makeGroup } from "~/../tests/factories/makeGroup";

describe("Create Group Case", () => {
  let inMemoryGroupRepository: InMemoryGroupRepository;
  let createGroupCase: CreateGroupCase;
  let groupTesting: Group;

  beforeEach(async () => {
    inMemoryGroupRepository = new InMemoryGroupRepository();
    createGroupCase = new CreateGroupCase(inMemoryGroupRepository);
    const { group } = await createGroupCase.execute(makeGroup());
    groupTesting = group;
  });

  it("should create a new task", async () => {
    expect(groupTesting).toBeInstanceOf(Group);
    expect(inMemoryGroupRepository.groups).toHaveLength(1);
  });
});
