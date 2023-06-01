import { InMemoryUserRepository } from "~/../tests/repositories/in-memory-user-repository";
import { AddParticipantInProjectCase } from "./add-participant-in-project-case";
import { InMemoryProjectRepository } from "~/../tests/repositories/in-memory-project-repository";
import { makeUser } from "~/../tests/factories/makeUser";
import { makeProject } from "~/../tests/factories/makeProject";

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
