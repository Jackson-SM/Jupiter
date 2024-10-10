import { Payload } from '@src/application/types/Payload';

export abstract class TokenProviderRepository {
  abstract sign(payload: Payload, expiresIn: string): Promise<string>;
  abstract verify(token: string): Promise<Payload>;
}
