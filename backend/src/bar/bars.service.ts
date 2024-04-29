import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Bar } from '../schemas/Bar.schema';
import { CreateBarDto } from './dto/createBar.dto';
import { PatchBarDto } from './dto/patchBar.dto';

@Injectable()
export class BarsService {
  constructor(
    @InjectModel(Bar.name)
    private readonly barModel: Model<Bar>,
  ) {}

  async create(createBarDto: CreateBarDto): Promise<Bar> {
    const createdBar = await this.barModel.create(createBarDto);
    return createdBar;
  }

  async update(id: string, patchBarDto: PatchBarDto) {
    const updatedBar = await this.barModel
      .findByIdAndUpdate(id, patchBarDto, { new: true })
      .exec();
    return updatedBar;
  }

  async findAll(): Promise<Bar[]> {
    return this.barModel.find().select('name brand _id').exec();
  }

  async findAllWithBrand(): Promise<Bar[]> {
    return this.barModel.aggregate([
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      },
      {
        $match: {
          'tags.brand': { $exists: true }
        }
      }
    ]).exec();
  }

  async findByName(name: string): Promise<Bar[]> {
    return this.barModel
      .find({ name: { $regex: new RegExp(name, 'i') } })
      .select('name brand _id')
      .exec();
  }

  async delete(id: string) {
    const deletedBar = await this.barModel.findByIdAndDelete(id).exec();
    return deletedBar;
  }
}