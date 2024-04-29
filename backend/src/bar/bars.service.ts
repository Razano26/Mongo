import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Bar } from '../schemas/Bar.schema';
import { CreateBarDto } from './dto/createBar.dto';

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

  async update(id: string, createBarDto: CreateBarDto) {
    const updatedBar = await this.barModel
      .findByIdAndUpdate(id, createBarDto, { new: true })
      .exec();
    return updatedBar;
  }

  async findAll(): Promise<Bar[]> {
    return this.barModel.find().select('name brand _id').exec();
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
