import { InMemoryUserRepository } from "tests/repositories/in-memory-user-repository";
import { CreateUserCase } from "./create-user-case";
import { FindUserByIdCase } from "./find-user-by-id-case";
import { makeUser } from "tests/factories/makeUser";
import { UserNotFound } from "./errors/UserNotFound";

describe("Find By Id User Case", () => {
  it("should create a new user", async () => {
    const inMemoryRepository = new InMemoryUserRepository();
    const findUserById = new FindUserByIdCase(inMemoryRepository);
    const createUserCase = new CreateUserCase(inMemoryRepository);

    const userCreated = await createUserCase.execute(makeUser());

    const { user } = await findUserById.execute({ id: userCreated.user.id });

    expect(inMemoryRepository.users[0]).toEqual(user);
  });
  it("should return new error case users void", async () => {
    const inMemoryRepository = new InMemoryUserRepository();
    const findUserById = new FindUserByIdCase(inMemoryRepository);
    const createUserCase = new CreateUserCase(inMemoryRepository);

    await createUserCase.execute(makeUser());

    await expect(findUserById.execute({ id: "a".repeat(20) })).rejects.toThrow(
      UserNotFound,
    );
  });
});
