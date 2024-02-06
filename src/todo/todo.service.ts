import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TodoRepo } from '../database/todo.repo';
import mongoose from 'mongoose';
import { ITodo } from 'src/models/todo.model';

@Injectable()
export class TodoService {
  constructor(private todoRepo: TodoRepo) {}
  getAllTasks() {
    return this.todoRepo.getAllTasks();
  }
  getAllTasksByProperty(userId: mongoose.Types.ObjectId) {
    return this.todoRepo.getAllTasksByProperty(userId);
  }
  getTaskById(userId: mongoose.Types.ObjectId, id: mongoose.Types.ObjectId) {
    return this.todoRepo.getTaskForUser(userId, id);
  }
  createTask(task: ITodo) {
    const taskObject = {
      ...task,
      createdAt: new Date().toString(),
    };
    return this.todoRepo.createTask(taskObject);
  }

  async updateTask(taskId, taskData) {
    const task = await this.CheckTaskBelongsToUser(taskId, taskData.userId);
    return await this.todoRepo.updateTask(taskId, taskData);
  }

  async deleteTask(taskId: mongoose.Types.ObjectId, userId: string) {
    const task = await this.CheckTaskBelongsToUser(taskId, userId);
    return await this.todoRepo.deletTask(taskId);
  }

  async CheckTaskBelongsToUser(
    taskId: mongoose.Types.ObjectId,
    userId: string,
  ) {
    const task = await this.todoRepo.getTaskById(taskId);
    if (!task)
      throw new NotFoundException(`For taskId: ${taskId} -> Task Not Found`);
    if (task.userId.toString() !== userId)
      throw new UnauthorizedException("You're Unautorized to update this task");
    return task;
  }
}
