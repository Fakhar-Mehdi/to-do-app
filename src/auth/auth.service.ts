import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepo } from 'src/database/user.repo';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepo,
    private jwtService: JwtService,
  ) {}

  async generateToken(userData) {
    const user: any = await this.userRepo.getUserWithPassword(userData);
    console.log('user', user);

    if (!user) throw new UnauthorizedException('Invalid Credentials');
    const payload = { username: user.username, id: user._id };
    return { accessToken: await this.jwtService.sign(payload) };
  }

  async validateToken(token: string) {
    const decode = this.jwtService.decode(token);
    const user = await this.userRepo.getUserById(decode.id);
    return !!user;
  }
}
