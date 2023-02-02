import { Body, Controller, Post, Request } from '@nestjs/common';
import { User } from '@prisma/client';
import { Result } from 'ts-results';
import { UserDto, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() userDto: UserDto): Promise<Result<User, Error>> {
    return await this.usersService.create(userDto);
  }
}
