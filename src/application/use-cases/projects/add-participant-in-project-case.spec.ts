import { InMemoryProjectRepository } from "tests/repositories/in-memory-project-repository";
import { AddParticipantInProjectCase } from "./add-participant-in-project-case";
import { makeUser } from "tests/factories/makeUser";
import { makeProject } from "tests/factories/makeProject";
import { InMemoryUserRepository } from "tests/repositories/in-memory-user-repository";

describe("Add Participant in Project Case", () => {
  it("should create a new relation task and user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryUserRepository,
    );
    const addParticipantInProjectCase = new AddParticipantInProjectCase(
      inMemoryProjectRepository,
    );
    await addParticipantInProjectCase.execute({
      userId: makeUser().id,
      projectId: makeProject().id,
    });
    await addParticipantInProjectCase.execute({
      userId: makeUser().id,
      projectId: makeProject().id,
    });

    expect(inMemoryProjectRepository.participants).toHaveLength(2);
  });
});
