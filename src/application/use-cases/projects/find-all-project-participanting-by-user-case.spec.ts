import { User } from "../../../domain/entities/User/User";
import { CreateProjectCase } from "./create-project-case";
import { Project } from "~/domain/entities/Project/Project";
import { AddParticipantInProjectCase } from "./add-participant-in-project-case";
import { InMemoryProjectRepository } from "~/../tests/repositories/in-memory-project-repository";
import { makeUser } from "~/../tests/factories/makeUser";
import { makeProject } from "~/../tests/factories/makeProject";
import { FindAllProjectParticipantingByUserCase } from "./find-all-project-participanting-by-user-case";
import { InMemoryUserRepository } from "~/../tests/repositories/in-memory-user-repository";
import { CreateUserCase } from "../users/create-user-case";

describe("Find all Projects User Participanting Case", () => {
  let inMemoryProjectRepository: InMemoryProjectRepository;
  let inMemoryUserRepository: InMemoryUserRepository;
  let createProjectCase: CreateProjectCase;
  let createUserCase: CreateUserCase;
  let findAllProjectParticipantingByUserCase: FindAllProjectParticipantingByUserCase;
  let addParticipantInProjectCase: AddParticipantInProjectCase;
  let userTesting: User;
  let projectTesting: Project;

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryUserRepository,
    );
    createProjectCase = new CreateProjectCase(inMemoryProjectRepository);
    createUserCase = new CreateUserCase(inMemoryUserRepository);
    addParticipantInProjectCase = new AddParticipantInProjectCase(
      inMemoryProjectRepository,
    );

    const { user } = await createUserCase.execute(makeUser());

    userTesting = user;

    const { project } = await createProjectCase.execute(makeProject());
    projectTesting = project;
    await addParticipantInProjectCase.execute({
      email: userTesting.email,
      projectId: projectTesting.id,
    });
    findAllProjectParticipantingByUserCase =
      new FindAllProjectParticipantingByUserCase(inMemoryProjectRepository);
  });

  it("should find projects user participanting", async () => {
    const { projects } = await findAllProjectParticipantingByUserCase.execute({
      userId: userTesting.id,
    });

    expect(projects).toHaveLength(1);
  });
});
