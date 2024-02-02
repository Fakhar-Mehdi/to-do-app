import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepo } from 'src/database/user.repo';
import { IUser } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepo,
    private jwtService: JwtService,
  ) {}
  async validateCredentials(userData) {
    const user: any = await this.userRepo.getUserByProperty(userData);
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    const payload = { username: user.username, id: user._id };
    return { accessToken: await this.jwtService.sign(payload) };
  }
}
