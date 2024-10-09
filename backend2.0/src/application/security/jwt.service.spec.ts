import { ServiceTokenRepository } from '@src/domain/repositories/service-token-repository';
import { makeUser } from '@test/factory/user-factory';
import { Payload } from '../types/Payload';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let tokenService: ServiceTokenRepository;

  beforeEach(() => {
    tokenService = new JwtService();
  });

  it('should generate a valid token', async () => {
    const user = makeUser();

    const payload: Payload = {
      email: user.email,
      id: user.id,
    };

    const token = await tokenService.sign(payload, '7d');

    expect(token).toBeDefined();
    expect(await tokenService.verify(token)).toMatchObject(payload);
  });

  it("should throw an error if the token isn't valid", async () => {
    const token = 'invalid';

    await expect(tokenService.verify(token)).rejects.toThrow();
  });

  it('should throw an error if the token is expired', async () => {
    const user = makeUser();

    const payload: Payload = {
      email: user.email,
      id: user.id,
    };

    const token = await tokenService.sign(payload, '1ms');

    await new Promise((resolve) => setTimeout(resolve, 1));

    await expect(tokenService.verify(token)).rejects.toThrow();
  });
});
