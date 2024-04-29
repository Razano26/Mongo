import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/User.schemas';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new HttpException('Invalid Credentials', 401);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid Credentials', 401);
    }

    return user;
  }

  async register({ username, password }: AuthPayloadDto) {
    // Check if user already exists
    const existingUser = await this.userService.findOne(username);
    if (existingUser) {
      throw new HttpException('User already exists', 400);
    }

    // Hash the password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    // Create the user
    const newUser = new User();
    newUser.username = username;
    newUser.password = hashedPassword;

    const user = await this.userService.create(newUser);
  }

  async loginUser({ username, password }: AuthPayloadDto) {
    const user = await this.validateUser({ username, password });
    if (!user) {
      throw new HttpException('Invalid Credentials', 401);
    }
    const accessToken = await this.accessToken(user);
    const refreshToken = await this.refreshToken(user);
    return { accessToken, refreshToken };
  }

  async accessToken(user: any) {
    const payload = {
      id: user._id,
      username: user.username,
    };
    return this.jwtService.sign(payload);
  }

  async refreshToken(user: any) {
    const tokenId = uuid();
    const payload = {
      id: user._id,
      username: user.username,
      tokenId: tokenId,
    };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
