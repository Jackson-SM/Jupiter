import { CreateGroupCase } from "./create-group-case";
import { InMemoryGroupRepository } from "tests/repositories/in-memory-group-repository";
import { makeGroup } from "tests/factories/makeGroup";
import { Group } from "~/domain/entities/Group/Group";
import { EditNameGroupCase } from "./edit-name-group-case";

describe("Delte Group Case", () => {
  let inMemoryGroupRepository: InMemoryGroupRepository;
  let createGroupCase: CreateGroupCase;
  let groupTesting: Group;
  let editNameGroupCase: EditNameGroupCase;

  beforeEach(async () => {
    inMemoryGroupRepository = new InMemoryGroupRepository();
    createGroupCase = new CreateGroupCase(inMemoryGroupRepository);
    editNameGroupCase = new EditNameGroupCase(inMemoryGroupRepository);
    const { group } = await createGroupCase.execute(makeGroup());
    groupTesting = group;
  });

  it("should to delete a new task", async () => {
    await editNameGroupCase.execute({ id: groupTesting.id, name: "new name" });

    expect(groupTesting).toBeInstanceOf(Group);
    expect(inMemoryGroupRepository.groups).toHaveLength(1);
    expect(inMemoryGroupRepository.groups[0].name).toEqual("new name");
  });
});
