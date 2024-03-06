import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { Users } from 'src/entities/users.entity.ts';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  findAll(paginationquery: PaginationQueryDto) {
    const { limit, page } = paginationquery;

    return this.userRepository.find({
      ...(page && limit && { skip: (page - 1) * limit }),
      ...(limit && { take: limit }),
    });
  }
  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }
}
