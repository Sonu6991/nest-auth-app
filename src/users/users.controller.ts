import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { AuthGaurd } from 'src/common/guards/auth.guard';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/common/guards/roles.gaurd';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enum/user-role.enum';

@Controller('users')
@UseGuards(AuthGaurd)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  
  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(@Query() paginationquery: PaginationQueryDto) {
    return this.userService.findAll(paginationquery);
  }
  
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
}
