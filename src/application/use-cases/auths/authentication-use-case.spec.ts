import { InMemoryUserRepository } from "tests/repositories/in-memory-user-repository";
import { AuthenticationUseCase } from "./authentication-use-case";
import { JwtTokenProvider } from "~/application/services/JwtTokenProvider";
import { CreateUserCase } from "../users/create-user-case";
import { User } from "~/domain/entities/User/User";
import { makeUser } from "tests/factories/makeUser";
import Boom from "@hapi/boom";

describe("Authentication", () => {
  let userRepository: InMemoryUserRepository;
  let jwtTokenProvider: JwtTokenProvider;
  let createUserCase: CreateUserCase;
  let authenticationUseCase: AuthenticationUseCase;
  let userTesting: User;
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    jwtTokenProvider = new JwtTokenProvider();
    createUserCase = new CreateUserCase(userRepository);
    authenticationUseCase = new AuthenticationUseCase(
      userRepository,
      jwtTokenProvider,
    );
    const { user } = await createUserCase.execute(makeUser());
    userTesting = user;
  });
  it("should create a new token JWT if user is correct", async () => {
    const token = await authenticationUseCase.authenticate(
      userTesting.email,
      "password",
    );

    expect(typeof token).toBe("object");
    expect(token).toBeDefined();
    expect(token).toEqual(
      expect.objectContaining({ user: userTesting, token: token.token }),
    );
  });
  it("should throw a new error if user not exists", async () => {
    await expect(
      authenticationUseCase.authenticate(
        "notexists@example.com",
        "passwordnotexists",
      ),
    ).rejects.toThrowError("User not found");
  });
});
