import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Bar } from '../schemas/Bar.schema';
import { CreateBarDto } from './dto/createBar.dto';
import { PatchBarDto } from './dto/patchBar.dto';

import { v4 as uuid } from 'uuid';

@Injectable()
export class BarsService {
  constructor(
    @InjectModel(Bar.name)
    private readonly barModel: Model<Bar>,
  ) {}

  async create(createBarDto: CreateBarDto): Promise<Bar> {
    const newBar = new this.barModel({
      ...createBarDto,
      id: uuid(),
    });
    return newBar.save();
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
    return this.barModel
      .aggregate([
        {
          $lookup: {
            from: 'tags',
            localField: 'id',
            foreignField: '_id',
            as: 'tags',
          },
        },
        {
          $match: {
            'tags.brand': { $ne: '' }, // Vérification que 'brand' n'est pas une chaîne vide
          },
        },
      ])
      .exec();
  }

  async findAllWithSport(): Promise<Bar[]> {
    return this.barModel
      .aggregate([
        {
          $lookup: {
            from: 'tags',
            localField: 'id',
            foreignField: '_id',
            as: 'tags',
          },
        },
        {
          $match: {
            'tags.sport': { $ne: null }, // Vérification que 'brand' n'est pas une chaîne vide
          },
        },
      ])
      .exec();
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
