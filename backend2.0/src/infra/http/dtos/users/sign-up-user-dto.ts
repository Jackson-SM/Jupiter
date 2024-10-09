import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpUserDTO {
  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  password: string;
}
