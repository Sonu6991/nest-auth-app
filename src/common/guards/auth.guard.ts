import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { UsersService } from 'src/users/users.service';

interface Jwtdata {
  userId: number;
}

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
    // @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;

    const req: any = context.switchToHttp().getRequest<Request>();

    const token = req.headers.authorization.split(' ').pop();
    if (!token) {
      return false;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Jwtdata;
    const user = await this.userService.findOne(decoded.userId);
    // const catchedToken = await this.cache.get(`userId${user.id}`);
    // console.log('catchedToken', catchedToken);
    req['user'] = user;
    return true;
  }
}
