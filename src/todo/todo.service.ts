import { Injectable } from '@nestjs/common';
import { TodoRepo } from '../database/todo.repo';
import mongoose from 'mongoose';
import { ITodo } from 'src/models/todo.model';

@Injectable()
export class TodoService {
  constructor(private todoRepo: TodoRepo) {}
  getAllTasks() {
    return this.todoRepo.getAllTasks();
  }
  getTaskById(id: mongoose.Types.ObjectId) {
    return this.todoRepo.getTaskById(id);
  }
  createTask(task: ITodo) {
    const taskObject = {
      ...task,
      createdAt: new Date().toTimeString(),
    };
    return this.todoRepo.createTask(taskObject);
  }
}
