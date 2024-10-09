import { UserRepository } from '@src/domain/repositories/user-repository';
import { makeUser } from '@test/factory/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { SignUpUser } from './signup-user';

describe('Create User Use Case', () => {
  let userRepository: UserRepository;
  let signupUser: SignUpUser;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    signupUser = new SignUpUser(userRepository);
  });

  it('should be able to create a new user', async () => {
    const { user } = await signupUser.execute(makeUser());

    const savedUser = await userRepository.findByEmail(user.email);

    expect(savedUser).toEqual(user);
  });

  it('should not be able to create a user with an email that already exists', async () => {
    const user = makeUser();

    await signupUser.execute(user);

    await expect(signupUser.execute(user)).rejects.toThrow(
      'User already exists',
    );
  });
});
