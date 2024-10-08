import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticationUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
