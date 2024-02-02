import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepo } from 'src/database/user.repo';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepo],
  exports: [UserRepo, UserService],
})
export class UserModule {}
