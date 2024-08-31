import { InMemoryUserRepository } from "~/../tests/repositories/in-memory-user-repository";
import { AddParticipantInProjectCase } from "./add-participant-in-project-case";
import { InMemoryProjectRepository } from "~/../tests/repositories/in-memory-project-repository";
import { makeUser } from "~/../tests/factories/makeUser";
import { makeProject } from "~/../tests/factories/makeProject";
import { CreateUserCase } from "../users/create-user-case";
import { RemoveParticipantInProjectCase } from "./remove-participant-in-project-case";

describe("Remove Participant in Project Case", () => {
  it("should to remove user of the project", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryUserRepository,
    );
    const createUserCase = new CreateUserCase(inMemoryUserRepository);
    const { user } = await createUserCase.execute(makeUser());
    const projectTesting = makeProject();
    const addParticipantInProjectCase = new AddParticipantInProjectCase(
      inMemoryProjectRepository,
    );
    const removeParticipantInProjectCase = new RemoveParticipantInProjectCase(
      inMemoryProjectRepository,
    );
    await addParticipantInProjectCase.execute({
      email: user.email,
      projectId: projectTesting.id,
    });
    await addParticipantInProjectCase.execute({
      email: makeUser().email,
      projectId: makeProject().id,
    });
    await addParticipantInProjectCase.execute({
      email: makeUser().email,
      projectId: makeProject().id,
    });

    await removeParticipantInProjectCase.execute({
      projectId: projectTesting.id,
      userId: user.id,
    });

    expect(inMemoryProjectRepository.participants).toHaveLength(2);
  });
});
