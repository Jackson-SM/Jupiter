import { InMemoryUserRepository } from "tests/repositories/in-memory-user-repository";
import { CreateUserCase } from "./create-user-case";
import { makeUser } from "tests/factories/makeUser";
import { UserNotFound } from "./errors/UserNotFound";
import { FindUserByEmail } from "./find-user-by-email-case";

describe("Find By Id User Case", () => {
  it("should create a new user", async () => {
    const inMemoryRepository = new InMemoryUserRepository();
    const findUserByEmail = new FindUserByEmail(inMemoryRepository);
    const createUserCase = new CreateUserCase(inMemoryRepository);

    const userCreated = await createUserCase.execute(makeUser());

    const { user } = await findUserByEmail.execute({
      email: userCreated.user.email,
    });

    expect(inMemoryRepository.users[0]).toEqual(user);
  });
  it("should return new error case users void", async () => {
    const inMemoryRepository = new InMemoryUserRepository();
    const findUserByEmail = new FindUserByEmail(inMemoryRepository);
    const createUserCase = new CreateUserCase(inMemoryRepository);

    await createUserCase.execute(makeUser());

    await expect(
      findUserByEmail.execute({ email: "emailtesting@test.com" }),
    ).rejects.toThrow(UserNotFound);
  });
});
