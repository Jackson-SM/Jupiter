import { User } from './User';

describe('User', () => {
  it('should be able to create a new user', () => {
    const user = new User({
      email: 'test@testmail.com',
      password: '123',
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(user).toBeTruthy();
  });
});
