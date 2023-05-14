import { InMemoryUserRepository } from "tests/repositories/in-memory-user-repository";
import { CreateUserCase } from "./create-user-case";
import { User } from "../../../domain/entities/User/User";
import { FindUserByIdCase } from "./find-user-by-id-case";
import { makeUser } from "tests/factories/makeUser";

describe("Create User Case", () => {
  let inMemoryRepository: InMemoryUserRepository;
  let createUserCase: CreateUserCase;
  let findUserById: FindUserByIdCase;
  let userTesting: User;

  beforeEach(async () => {
    inMemoryRepository = new InMemoryUserRepository();
    createUserCase = new CreateUserCase(inMemoryRepository);
    findUserById = new FindUserByIdCase(inMemoryRepository);
    const { user } = await createUserCase.execute(makeUser());
    userTesting = user;
  });

  it("should create a new user", async () => {
    const { user } = await findUserById.execute({
      id: userTesting.id,
    });

    expect(user).toEqual(userTesting);
    expect(inMemoryRepository.users).toHaveLength(1);
  });
  it("should throw new Error if user already exists", async () => {
    await expect(createUserCase.execute(userTesting)).rejects.toThrow();
    expect(inMemoryRepository.users).toHaveLength(1);
  });
});
