import { Injectable, NotFoundException } from '@nestjs/common';
import userModel from 'src/models/user.model';

@Injectable()
export class UserRepo {
  async getAllUsers() {
    const users = await userModel.find().select('-__v');
    return users;
  }
  async createUser(userObject) {
    const user = new userModel(userObject);
    await user.save();
    return user;
  }
  async getUserById(id) {
    const user = await userModel.findById(id);
    if (!user) throw new NotFoundException(`For id: ${id}: User not Found`);
    return user;
  }
  async getUserByProperty(userData) {
    const user = await userModel.find(userData);
    return user;
  }
}
