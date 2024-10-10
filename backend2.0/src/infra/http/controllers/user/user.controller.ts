import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { FindByEmailUseCase } from '@src/application/use-cases/user/find-by-email-use-case';
import { SignUpUseCase } from '@src/application/use-cases/user/signup-use-case';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { Response } from 'express';
import { SignUpUserDTO } from '../../dtos/users/sign-up-user-dto';
import { UserViewModel } from '../../view-models/user-view-model';

@Controller('/users')
export class UserController {
  constructor(
    private signupUser: SignUpUseCase,
    private findByEmail: FindByEmailUseCase,
    private authService: AuthenticationRepository,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() body: SignUpUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, firstName, lastName, password } = body;

    await this.signupUser.execute({
      email,
      firstName,
      lastName,
      password,
    });

    const { token } = await this.authService.signIn(email, password);

    response.cookie('access_token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  @Get(':email')
  async findEmail(@Param('email') email: string) {
    const { user } = await this.findByEmail.execute({ email });

    const userViewModel = UserViewModel.toHTTP(user);

    return userViewModel;
  }
}
