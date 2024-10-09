import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FindByEmail } from '@src/application/use-cases/user/find-by-email';
import { SignUpUser } from '@src/application/use-cases/user/signup-user';
import { SignUpUserDTO } from '../../dtos/users/create-user-dto';
import { UserViewModel } from '../../view-models/user-view-model';

@Controller('/users')
export class UserController {
  constructor(
    private signupUser: SignUpUser,
    private findByEmail: FindByEmail,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: SignUpUserDTO) {
    const { email, firstName, lastName, password } = body;

    await this.signupUser.execute({
      email,
      firstName,
      lastName,
      password,
    });
  }

  @Get(':email')
  async findEmail(@Param('email') email: string) {
    const { user } = await this.findByEmail.execute({ email });

    const userViewModel = UserViewModel.toHTTP(user);

    return userViewModel;
  }
}
