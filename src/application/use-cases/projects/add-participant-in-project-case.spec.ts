import { InMemoryUserRepository } from "~/../tests/repositories/in-memory-user-repository";
import { AddParticipantInProjectCase } from "./add-participant-in-project-case";
import { InMemoryProjectRepository } from "~/../tests/repositories/in-memory-project-repository";
import { makeUser } from "~/../tests/factories/makeUser";
import { makeProject } from "~/../tests/factories/makeProject";
import { CreateUserCase } from "../users/create-user-case";

describe("Add Participant in Project Case", () => {
  it("should create a new relation task and user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryUserRepository,
    );
    const createUserCase = new CreateUserCase(inMemoryUserRepository);
    const { user } = await createUserCase.execute(makeUser());
    const addParticipantInProjectCase = new AddParticipantInProjectCase(
      inMemoryProjectRepository,
    );
    await addParticipantInProjectCase.execute({
      email: user.email,
      projectId: makeProject().id,
    });
    await addParticipantInProjectCase.execute({
      email: makeUser().email,
      projectId: makeProject().id,
    });
    await addParticipantInProjectCase.execute({
      email: makeUser().email,
      projectId: makeProject().id,
    });

    expect(inMemoryProjectRepository.participants).toHaveLength(3);
    expect(inMemoryProjectRepository.participants[0].userId).toEqual(user.id);
  });
});
