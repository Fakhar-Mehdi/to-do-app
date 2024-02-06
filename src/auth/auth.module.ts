import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TodoModule } from 'src/todo/todo.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { TodoController } from 'src/todo/todo.controller';
import { UserController } from 'src/user/user.controller';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService, UserModule],
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
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TodoController, UserController);
  }
}
