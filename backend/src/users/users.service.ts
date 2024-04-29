import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schemas';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async create(user: User) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
