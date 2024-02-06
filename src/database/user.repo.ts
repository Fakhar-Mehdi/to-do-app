import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';
import userModel, { IUpdateUser } from 'src/models/user.model';

@Injectable()
export class UserRepo {
  async getAllUsers() {
    const users = await userModel.find().select('-__v  -password');
    return users;
  }
  async createUser(userObject) {
    const user = new userModel(userObject);
    await user.save();
    user.__v = undefined;
    return user;
  }
  async getUserById(id) {
    const user = await userModel.findById(id).select('-__v  -password');
    if (!user) throw new NotFoundException(`For id: ${id} -> User not Found`);
    return user;
  }
  async getUserWithPassword(userData) {
    const user = await userModel.find(userData).select('-__v');
    if (user.length <= 0) throw new NotFoundException('User Not Found');
    return user[0];
  }
  async getUserByProperty(userData) {
    const user = await userModel.find(userData).select('-__v -password');
    return user;
  }
  async updateUser(userData: IUpdateUser) {
    const user = await this.getUserWithPassword({ _id: userData.userId });
    user.username = userData.username || user.username;
    user.password = userData.password || user.password;
    await user.save();
    return user;
  }
  async deleteUser(id: mongoose.Types.ObjectId) {
    const deletedUser = await userModel.findByIdAndDelete(id);
    return deletedUser;
  }
}
