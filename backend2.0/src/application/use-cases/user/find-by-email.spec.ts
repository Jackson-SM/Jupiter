import { UserRepository } from '@src/domain/repositories/user-repository';
import { makeUser } from '@test/factory/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { FindByEmail } from './find-by-email';

describe('Find By Email Use Case', () => {
  let userRepository: UserRepository;
  let findByEmail: FindByEmail;
  let email: string;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    findByEmail = new FindByEmail(userRepository);
    email = 'emailfind@mail.com';
  });

  it("should be able to find a user by it's email", async () => {
    const userTest = makeUser({ email });

    await userRepository.save(userTest);

    const { user } = await findByEmail.execute({ email });

    expect(user.email).toBe(email);
  });

  it('should not be able to find a user with a non-existent email', async () => {
    await expect(findByEmail.execute({ email })).rejects.toThrow(
      'User not found',
    );
  });
});