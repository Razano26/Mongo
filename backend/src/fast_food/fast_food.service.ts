import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Fast_Food } from '../schemas/Fast_food.schema';
import { CreateFast_FoodDto } from './dto/createFast_food.dto';
import { PatchFast_FoodDto } from './dto/patchFast_food.dto';

@Injectable()
export class Fast_FoodsService {
  constructor(
    @InjectModel(Fast_Food.name)
    private readonly fast_foodModel: Model<Fast_Food>,
  ) {}

  async create(createFast_FoodDto: CreateFast_FoodDto): Promise<Fast_Food> {
    const createdFast_Food =
      await this.fast_foodModel.create(createFast_FoodDto);
    return createdFast_Food;
  }

  async update(id: string, patchFast_FoodDto: PatchFast_FoodDto) {
    const updatedFast_Food = await this.fast_foodModel
      .findByIdAndUpdate(id, patchFast_FoodDto, { new: true })
      .exec();
    return updatedFast_Food;
  }

  async findAll(): Promise<Fast_Food[]> {
    return this.fast_foodModel.find().select('name brand _id').exec();
  }

  async findAllWithBrand(): Promise<Fast_Food[]> {
    return this.fast_foodModel
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

  async findAllWithSport(): Promise<Fast_Food[]> {
    return this.fast_foodModel
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

  async findByName(name: string): Promise<Fast_Food[]> {
    return this.fast_foodModel
      .find({ name: { $regex: new RegExp(name, 'i') } })
      .select('name brand _id')
      .exec();
  }

  async delete(id: string) {
    const deletedFast_Food = await this.fast_foodModel
      .findByIdAndDelete(id)
      .exec();
    return deletedFast_Food;
  }
}
