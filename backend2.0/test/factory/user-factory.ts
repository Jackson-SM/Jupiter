import { User, UserProps } from '@src/domain/entities/user';

type Override = Partial<UserProps>;

export function makeUser(override?: Override) {
  return new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@testmail.com',
    password: '12345678',
    disabled: false,
    ...override,
  });
}
