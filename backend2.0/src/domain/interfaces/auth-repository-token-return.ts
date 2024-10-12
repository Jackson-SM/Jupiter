import { User } from '../entities/User';

export interface AuthRepositoryTokenReturn {
  access_token: string;
  user: User;
}
