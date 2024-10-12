import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/domain/entities/User';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { UserRepository } from '@src/domain/repositories/user-repository';
import { AuthService } from '@src/infra/http/auth/auth.service';
import { makeUser } from '@test/factory/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { SignInUseCase } from './sign-in-use-case';

describe('Sign In Use Case', () => {
  let signIn: SignInUseCase;
  let authenticationRepository: AuthenticationRepository;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'test' });
    userRepository = new InMemoryUserRepository();
    authenticationRepository = new AuthService(userRepository, jwtService);
    signIn = new SignInUseCase(authenticationRepository);
  });

  it('should be able to sign in', async () => {
    const factory = makeUser();

    await userRepository.save(factory);

    const { access_token, user } = await signIn.execute({
      email: factory.email,
      password: factory.password,
    });

    expect(access_token).toBeDefined();
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
