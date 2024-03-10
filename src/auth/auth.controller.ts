import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto, LoginUserDto } from 'src/dto/user';
import { Users } from 'src/entities/users.entity.ts';
import { AuthService } from './auth.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('auth')
@UseInterceptors(CacheInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @Post('login')
  @Public()
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const user: any = (await this.authService.login(loginUserDto)) as Users;
    if (user?.authToken) {
      res.setHeader('authorization', user.authToken);
    }
    return res.status(HttpStatus.OK).send(user);
  }
}
