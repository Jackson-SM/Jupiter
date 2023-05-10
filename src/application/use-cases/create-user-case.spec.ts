import { InMemoryUserRepository } from "tests/repositories/in-memory-user-repository";
import { CreateUserCase } from "./create-user-case";

describe("Create User Case", () => {
  it("should create a new user", async () => {
    const inMemoryRepository = new InMemoryUserRepository();
    const createUserCase = new CreateUserCase(inMemoryRepository);

    const { user } = await createUserCase.execute({
      firstName: "testfirstname",
      lastName: "testlatname",
      email: "test@example.com",
      password: "testpassword",
    });

    expect(inMemoryRepository.users[0]).toEqual(user);
    expect(inMemoryRepository.users).toHaveLength(1);
  });
});
