import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import { CreateBarDto } from './dto/create-bar.dto';
import { Bar } from './schemas/bar.schema';

@Injectable()
export class BarsService {
  constructor(@InjectModel(Bar.name) private readonly barModel: Model<Bar>) {}

  //   async create(createBarDto: CreateBarDto): Promise<Bar> {
  //     const createdBar = await this.barModel.create(createBarDto);
  //     return createdBar;
  //   }

  async findAll(): Promise<Bar[]> {
    return this.barModel.find().select('name brand _id').exec();
  }

  async findByName(name: string): Promise<Bar[]> {
    return this.barModel.find({ name: { $regex: new RegExp(name, 'i') } }).select('name brand _id').exec();
  }

  //   async delete(id: string) {
  //     const deletedBar = await this.barModel
  //       .findByIdAndRemove({ _id: id })
  //       .exec();
  //     return deletedBar;
  //   }
}
