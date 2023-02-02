import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Err, Ok, Result } from 'ts-results';

export class UserDto {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<Result<User, Error>> {
    try {
      const result = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (result) {
        return Ok(result);
      } else {
        return Err(new Error('User not found'));
      }
    } catch (error: any) {
      return Err(error);
    }
  }

  async create(userDto: UserDto): Promise<Result<User, Error>> {
    try {
      const result = await this.prisma.user.create({
        data: {
          email: userDto.email,
          name: userDto.name,
          password: await hash(userDto.password, 10),
        },
      });

      return Ok(result);
    } catch (err: any) {
      return Err(err);
    }
  }
}
