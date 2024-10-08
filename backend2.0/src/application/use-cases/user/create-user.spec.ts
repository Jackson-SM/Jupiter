import { UserRepository } from '@src/domain/repositories/user-repository';
import { makeUser } from '@test/factory/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { CreateUser } from './create-user';

describe('Create User Use Case', () => {
  let userRepository: UserRepository;
  let createUser: CreateUser;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createUser = new CreateUser(userRepository);
  });

  it('should be able to create a new user', async () => {
    const { user } = await createUser.execute(makeUser());

    const savedUser = await userRepository.findByEmail(user.email);

    expect(savedUser).toEqual(user);
  });

  it('should not be able to create a user with an email that already exists', async () => {
    const user = makeUser();

    await createUser.execute(user);

    await expect(createUser.execute(user)).rejects.toThrow(
      'User already exists',
    );
  });
});
