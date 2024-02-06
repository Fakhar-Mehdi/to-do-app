import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import todoModel, { ITodo } from '../models/todo.model';
import mongoose, { isObjectIdOrHexString } from 'mongoose';
import userModel from 'src/models/user.model';

@Injectable()
export class TodoRepo {
  async getAllTasks() {
    return await todoModel.find().select('-__v');
  }
  async getAllTasksByProperty(userId: mongoose.Types.ObjectId) {
    return await todoModel.find({ userId }).select('-__v');
  }
  async getTaskById(id: mongoose.Types.ObjectId) {
    if (!isObjectIdOrHexString(id))
      throw new BadRequestException('Invalid TaskId Format');

    const task = await todoModel.findById(id).select('-__v');
    if (task) return task;
    throw new NotFoundException(`For id: ${id} -> Task Not Found`);
  }
  async updateTask(taskId: mongoose.Types.ObjectId, taskData) {
    const task = await todoModel.findById(taskId);

    task.description = taskData.description || task.description;
    task.isCompleted = taskData.isCompleted || task.isCompleted;
    await task.save();
    task.__v = undefined;
    return task;
  }
  async deletTask(id: mongoose.Types.ObjectId) {
    const task = await todoModel.findByIdAndDelete(id);
    return task;
  }
  async getTaskForUser(
    userId: mongoose.Types.ObjectId,
    id: mongoose.Types.ObjectId,
  ) {
    if (!isObjectIdOrHexString(userId) || !isObjectIdOrHexString(id))
      throw new BadRequestException('Invalid Id Format');

    const task = await todoModel.findById(id).select('-__v');
    if (task && task.userId === userId) return task;
    else {
      if (task)
        throw new UnauthorizedException("You're Unautorized to view this task");
      throw new NotFoundException(`For id: ${id}\nTask not found`);
    }
  }

  async createTask(taskObject: ITodo) {
    const { userId } = taskObject;
    const user = await userModel.findById(userId);
    if (!user) throw new BadRequestException("User Doesn't Exist");
    const task = new todoModel(taskObject);
    await task.save();
    return task;
  }
  //make as completed
}
