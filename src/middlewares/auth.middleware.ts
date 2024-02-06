import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserRepo } from 'src/database/user.repo';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userRepo: UserRepo,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Verifying the Token.......');

    const decode = this.jwtService.decode(req.headers.authorization);
    const user = await this.userRepo.getUserById(decode?.id);
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    req['body']['userId'] = decode.id;
    next();
  }
}
