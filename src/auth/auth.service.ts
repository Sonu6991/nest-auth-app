import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { throwError } from 'rxjs';
import { generatePassword } from 'src/common/utils/generatePassword';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { Users } from 'src/entities/users.entity.ts';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepositoty: Repository<Users>,
  ) {}

  generateToken(userId: number): string {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return token;
  }
  async signup(createUserDto: CreateUserDto) {
    const existedUser = await this.userRepositoty.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existedUser) {
      return throwError(() => new BadRequestException('user already exists.'));
    }
    const user = this.userRepositoty.create(createUserDto);
    // password hash
    // const randomPassword = generatePassword(); //random password
    user.password = await bcrypt.hash(
      createUserDto.password,
      +process.env.BCRYPT_SALT,
    );
    return this.userRepositoty.save(user);
  }
  async login(loginUserDto: LoginUserDto) {
    const existedUser = await this.userRepositoty.findOne({
      where: {
        email: loginUserDto.email,
      },
    });
    if (!existedUser) {
      return throwError(() => new NotFoundException('User does not exists'));
    }

    // compare password
    const isPasswordMathched = await bcrypt.compare(
      loginUserDto.password,
      existedUser.password,
    );
    if (!isPasswordMathched) {
      return throwError(
        () => new BadRequestException('Password does not match'),
      );
    }
    return existedUser;
  }
}
