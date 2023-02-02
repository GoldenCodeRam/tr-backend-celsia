import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { Err, Result } from 'ts-results';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Result<User, Error>> {
    const user = await this.usersService.findOne(email);

    if (user.ok) {
      const result = await compare(password, user.unwrap().password);

      if (result) {
        return user;
      } else {
        return Err(new Error('Incorrect password'));
      }
    }
    return Err(new Error('User not found'));
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
