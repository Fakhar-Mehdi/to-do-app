import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { TodoRepo } from './todo.repo';
import mongoose from 'mongoose';

@Injectable()
export class TodoService {
  constructor(private todoRepo: TodoRepo) {}
  getAllTasks() {
    return this.todoRepo.getAllTasks();
  }
  getTaskById(id: mongoose.Types.ObjectId) {
    return this.todoRepo.getTaskById(id);
  }
  createTask(description: string) {
    const taskObject = {
      description,
      createdAt: new Date().toTimeString(),
    };
    return this.todoRepo.createTask(taskObject);
  }
}
