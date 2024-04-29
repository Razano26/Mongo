import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
  },
  {
    id: 2,
    username: 'user',
    password: 'user',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ username, password }: AuthPayloadDto) {
    const findUser = fakeUsers.find((user) => user.username === username);

    if (!findUser) {
      throw new HttpException('Invalid Credentials', 401);
    }

    if (findUser.password === password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    } else {
      throw new HttpException('Invalid Credentials', 401);
    }
  }
}
