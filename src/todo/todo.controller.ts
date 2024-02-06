import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTaskDto } from './dtos/create-task.dto';
import mongoose from 'mongoose';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTasks(@Body() body: any) {
    return this.todoService.getAllTasksByProperty(body.userId);
  }

  @Post()
  createTask(@Body() task: createTaskDto) {
    return this.todoService.createTask(task);
  }

  @Get('/:id')
  getTaskById(@Param('id') taskId: mongoose.Types.ObjectId, @Body() body: any) {
    return this.todoService.getTaskById(body.userId, taskId);
  }

  @Put('/:id')
  async updateTask(
    @Param('id') taskId: mongoose.Types.ObjectId,
    @Body() taskData: any,
  ) {
    return this.todoService.updateTask(taskId, taskData);
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id') taskId: mongoose.Types.ObjectId,
    @Body() body: any,
  ) {
    return this.todoService.deleteTask(taskId, body.userId);
  }
}
