import { User } from '../entities/User';

export interface AuthRepositoryTokenReturn {
  token: string;
  user: User;
}
