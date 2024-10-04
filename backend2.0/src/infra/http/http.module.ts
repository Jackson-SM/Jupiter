import { Module } from '@nestjs/common';
import { CreateUser } from '@src/application/use-cases/create-user';
import { FindByEmail } from '@src/application/use-cases/find-by-email';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUser, FindByEmail],
})
export class HttpModule {}
