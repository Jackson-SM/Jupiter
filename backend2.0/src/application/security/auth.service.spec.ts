import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { ServiceTokenRepository } from '@src/domain/repositories/service-token-repository';
import { UserRepository } from '@src/domain/repositories/user-repository';
import { makeUser } from '@test/factory/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

describe('AuhService', () => {
  let authService: AuthenticationRepository;
  let userRepository: UserRepository;
  let serviceToken: ServiceTokenRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    serviceToken = new JwtService();
    authService = new AuthService(userRepository, serviceToken);
  });

  it('should sign in a user', async () => {
    const testUser = makeUser();

    const repo_user = await userRepository.save(testUser);

    const { user, token } = await authService.signIn(
      testUser.email,
      testUser.password,
    );

    expect(user).toMatchObject(repo_user);
    expect(token).toBeDefined();
    expect(user.email).toEqual(repo_user.email);
  });

  it('should throw an error if the user is not found', async () => {
    await expect(authService.signIn('invalid', 'invalid')).rejects.toThrow(
      new NotFoundException('User not found'),
    );
  });

  it('should throw an error if the password is invalid', async () => {
    const testUser = makeUser();

    await userRepository.save(testUser);

    await expect(authService.signIn(testUser.email, 'invalid')).rejects.toThrow(
      new UnauthorizedException('Invalid credentials'),
    );
  });
});
