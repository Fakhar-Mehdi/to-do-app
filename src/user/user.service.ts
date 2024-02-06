import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { isValidObjectId } from 'mongoose';
import { UserRepo } from 'src/database/user.repo';
import { IUpdateUser, IUser } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  async getAllUsers(token: string) {
    return await this.userRepo.getAllUsers();
  }
  async createUser(userObject: IUser) {
    if (userObject.password.length < 4)
      throw new BadRequestException("Password's length must be 4 or more");
    return await this.userRepo.createUser(userObject);
  }
  getUserById(id: mongoose.Types.ObjectId) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid Id Format');
    return this.userRepo.getUserById(id);
  }
  async updateUser(userData: IUpdateUser) {
    return await this.userRepo.updateUser(userData);
  }
  async deleteUser(id: mongoose.Types.ObjectId) {
    return await this.userRepo.deleteUser(id);
  }
}
