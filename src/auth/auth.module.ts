import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TodoModule } from 'src/todo/todo.module';
import { UserModule } from 'src/user/user.module';
import { UserRepo } from 'src/database/user.repo';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserModule],
  // imports: [UserModule, TodoModule, JwtService],
  imports: [
    UserModule,
    TodoModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
