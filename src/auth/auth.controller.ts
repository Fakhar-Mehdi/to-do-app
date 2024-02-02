import { Controller, Post, Body } from '@nestjs/common';
import { IUser } from 'src/models/user.model';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  signIn(@Body() userData: CreateUserDto) {
    return this.authService.validateCredentials(userData);
  }
}
