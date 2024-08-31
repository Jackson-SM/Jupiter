import { CreateUserCase } from "./create-user-case";
import { User } from "~/domain/entities/User/User";
import { FindUserByEmailCase } from "./find-user-by-email-case";
import Boom from "@hapi/boom";
import { makeUser } from "~/../tests/factories/makeUser";
import { InMemoryUserRepository } from "~/../tests/repositories/in-memory-user-repository";

describe("Find By Id User Case", () => {
  let inMemoryRepository: InMemoryUserRepository;
  let findUserByEmail: FindUserByEmailCase;
  let createUserCase: CreateUserCase;
  let userTesting: User;

  beforeEach(async () => {
    inMemoryRepository = new InMemoryUserRepository();
    findUserByEmail = new FindUserByEmailCase(inMemoryRepository);
    createUserCase = new CreateUserCase(inMemoryRepository);
    const { user } = await createUserCase.execute(makeUser());
    userTesting = user;
  });

  it("should return an user if exists", async () => {
    const { user: raw } = await findUserByEmail.execute({
      email: userTesting.email,
    });

    expect(raw).toEqual(userTesting);
  });
  it("should return new error case user not exists", async () => {
    await expect(
      findUserByEmail.execute({ email: "emailtest@testing.com" }),
    ).rejects.toThrow(Boom.notFound("User not found"));
  });
});
