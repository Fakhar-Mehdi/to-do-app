import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import todoModel, { ITodo } from './todo.model';
import mongoose, { isObjectIdOrHexString } from 'mongoose';

@Injectable()
export class TodoRepo {
  async getAllTasks() {
    return await todoModel.find().select('-__v');
  }
  async getTaskById(id: mongoose.Types.ObjectId) {
    if (!isObjectIdOrHexString(id))
      throw new BadRequestException('Invalid Id Format');

    const task = await todoModel.findById(id).select('-__v');
    if (task) return task;
    throw new NotFoundException(`For id: ${id}\nTask not found`);
  }
  async createTask(taskObject: ITodo) {
    const task = new todoModel(taskObject);
    await task.save();
    return task;
  }
}
