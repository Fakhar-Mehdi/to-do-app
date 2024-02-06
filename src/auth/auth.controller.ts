import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  signIn(@Body() userData: CreateUserDto) {
    return this.authService.generateToken(userData);
  }

  @Post('/signup')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
