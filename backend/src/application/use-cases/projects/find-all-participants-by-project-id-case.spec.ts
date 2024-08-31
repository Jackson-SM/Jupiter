import { CreateUserCase } from "../users/create-user-case";
import { User } from "../../../domain/entities/User/User";
import { CreateProjectCase } from "./create-project-case";
import { Project } from "~/domain/entities/Project/Project";
import { FindAllParticipantsByProjectIdCase } from "./find-all-participants-by-project-id-case";
import { AddParticipantInProjectCase } from "./add-participant-in-project-case";
import { InMemoryProjectRepository } from "~/../tests/repositories/in-memory-project-repository";
import { InMemoryUserRepository } from "~/../tests/repositories/in-memory-user-repository";
import { makeUser } from "~/../tests/factories/makeUser";
import { makeProject } from "~/../tests/factories/makeProject";

describe("Find all Participants Project User Case", () => {
  let inMemoryUserRepository: InMemoryUserRepository;
  let inMemoryProjectRepository: InMemoryProjectRepository;
  let createUserCase: CreateUserCase;
  let createProjectCase: CreateProjectCase;
  let findAllParticipantsByProjectIdCase: FindAllParticipantsByProjectIdCase;
  let addParticipantInProjectCase: AddParticipantInProjectCase;
  let userTesting: User;
  let userTestingTwo: User;
  let projectTesting: Project;

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository(
      inMemoryUserRepository,
    );
    createUserCase = new CreateUserCase(inMemoryUserRepository);
    createProjectCase = new CreateProjectCase(inMemoryProjectRepository);
    addParticipantInProjectCase = new AddParticipantInProjectCase(
      inMemoryProjectRepository,
    );
    const { user } = await createUserCase.execute(makeUser());
    const { user: userTwo } = await createUserCase.execute(
      makeUser({ email: "usertwo@exmaple.com" }),
    );
    userTesting = user;
    userTestingTwo = userTwo;
    const { project } = await createProjectCase.execute(
      makeProject({ leadId: userTesting.id }),
    );
    projectTesting = project;
    await addParticipantInProjectCase.execute({
      email: userTesting.email,
      projectId: projectTesting.id,
    });
    await addParticipantInProjectCase.execute({
      email: userTestingTwo.email,
      projectId: projectTesting.id,
    });
    findAllParticipantsByProjectIdCase = new FindAllParticipantsByProjectIdCase(
      inMemoryProjectRepository,
    );
  });

  it("should find users participants of the project", async () => {
    const { users } = await findAllParticipantsByProjectIdCase.execute({
      projectId: projectTesting.id,
    });

    expect(users).toHaveLength(2);
    expect(users[0]).toEqual(userTesting);
    expect(users[1]).toEqual(userTestingTwo);
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining(userTesting),
        expect.objectContaining(userTestingTwo),
      ]),
    );
  });
});
