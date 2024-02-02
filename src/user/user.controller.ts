import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import mongoose from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  getUserById(@Param('id') id: mongoose.Types.ObjectId) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
