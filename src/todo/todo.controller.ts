import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTaskDto } from './dtos/create-task.dto';
import mongoose from 'mongoose';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTasks() {
    return this.todoService.getAllTasks();
  }

  @Post()
  createTask(@Body() task: createTaskDto) {
    return this.todoService.createTask(task.title);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: mongoose.Types.ObjectId) {
    return this.todoService.getTaskById(id);
  }
}
