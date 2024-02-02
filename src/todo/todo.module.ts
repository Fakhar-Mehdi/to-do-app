import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepo } from '../database/todo.repo';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoRepo],
})
export class TodoModule {}
