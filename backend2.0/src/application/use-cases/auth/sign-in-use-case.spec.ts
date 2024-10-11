import { UnauthorizedException } from '@nestjs/common';
import { User } from '@src/domain/entities/User';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { TokenProviderRepository } from '@src/domain/repositories/token-provider-repository';
import { UserRepository } from '@src/domain/repositories/user-repository';
import { AuthService } from '@src/infra/auth/auth.service';
import { JwtService } from '@src/infra/token/jwt.service';
import { makeUser } from '@test/factory/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { SignInUseCase } from './sign-in-use-case';

describe('Sign In Use Case', () => {
  let signIn: SignInUseCase;
  let authenticationRepository: AuthenticationRepository;
  let tokenService: TokenProviderRepository;
  let userRepository: UserRepository;

  beforeEach(() => {
    tokenService = new JwtService();
    userRepository = new InMemoryUserRepository();
    authenticationRepository = new AuthService(userRepository, tokenService);
    signIn = new SignInUseCase(authenticationRepository);
  });

  it('should be able to sign in', async () => {
    const factory = makeUser();

    await userRepository.save(factory);

    const { token, user } = await signIn.execute({
      email: factory.email,
      password: factory.password,
    });

    expect(token).toBeDefined();
    expect(user.email).toEqual(factory.email);
  });

  it('should not return a token if the user is disabled', async () => {
    const user = new User({
      email: 'test@testmail.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      disabled: true,
    });

    await userRepository.save(user);

    expect(user.disabled).toBeTruthy();
    await expect(
      signIn.execute({ email: user.email, password: user.password }),
    ).rejects.toThrow(new UnauthorizedException('User is disabled'));
  });
});
