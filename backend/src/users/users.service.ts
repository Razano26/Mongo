import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const savedNewSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: savedNewSettings._id,
      });
      return newUser.save();
    }
    return createdUser.save();
  }

  getUsers() {
    return this.userModel.find().populate(['settings', 'posts']);
  }

  async getUserById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID', 400);
    }
    const user = (await this.userModel.findById(id)).populate([
      'settings',
      'posts',
    ]);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async updateUser(id: string, updateUserdto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID', 400);
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return await this.userModel.findByIdAndUpdate(id, updateUserdto, {
      new: true,
    });
  }

  async deleteUser(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID', 400);
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return await this.userModel.findByIdAndDelete(id);
  }
}
