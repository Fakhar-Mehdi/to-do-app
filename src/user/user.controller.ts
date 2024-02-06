import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUser(@Body() userData: UpdateUserDto) {
    return this.userService.getUserById(userData.userId);
  }
  @Put()
  async updateUser(@Body() userData: UpdateUserDto) {
    return this.userService.updateUser(userData);
  }
  @Delete()
  async deleteUser(@Body() userData: UpdateUserDto) {
    return this.userService.deleteUser(userData.userId);
  }
}
