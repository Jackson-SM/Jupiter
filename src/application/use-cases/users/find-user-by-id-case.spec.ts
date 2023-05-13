import { InMemoryUserRepository } from "tests/repositories/in-memory-user-repository";
import { CreateUserCase } from "./create-user-case";
import { FindUserByIdCase } from "./find-user-by-id-case";
import { makeUser } from "tests/factories/makeUser";
import { UserNotFound } from "./errors/UserNotFound";
import { User } from "~/domain/entities/User/User";

describe("Find By Id User Case", () => {
  let inMemoryRepository: InMemoryUserRepository;
  let findUserById: FindUserByIdCase;
  let createUserCase: CreateUserCase;
  let userTesting: User;

  beforeEach(async () => {
    inMemoryRepository = new InMemoryUserRepository();
    findUserById = new FindUserByIdCase(inMemoryRepository);
    createUserCase = new CreateUserCase(inMemoryRepository);
    const { user } = await createUserCase.execute(makeUser());
    userTesting = user;
  });

  it("should return a user in first position", async () => {
    const { user: raw } = await findUserById.execute({
      id: userTesting.id,
    });

    expect(raw).toEqual(userTesting);
  });
  it("should return new error case user not exists", async () => {
    await expect(findUserById.execute({ id: "a".repeat(20) })).rejects.toThrow(
      UserNotFound,
    );
  });
});
