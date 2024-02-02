import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { isValidObjectId } from 'mongoose';
import { UserRepo } from 'src/database/user.repo';
import { IUser } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  getAllUsers() {
    return this.userRepo.getAllUsers();
  }
  createUser(userObject: IUser) {
    if (userObject.password.length < 4)
      throw new BadRequestException("Password's length must be 4 or more");
    return this.userRepo.createUser(userObject);
  }
  getUserById(id: mongoose.Types.ObjectId) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid Id Format');
    return this.userRepo.getUserById(id);
  }
}
