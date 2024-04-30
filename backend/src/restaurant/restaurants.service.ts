import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Restaurant } from '../schemas/Restaurant.schema';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';

import { v4 as uuid } from 'uuid';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const newBar = new this.restaurantModel({
      ...createRestaurantDto,
      id: uuid(),
    });
    return newBar.save();
  }

  async update(id: string, createRestaurantDto: CreateRestaurantDto) {
    const updatedRestaurant = await this.restaurantModel
      .findByIdAndUpdate(id, createRestaurantDto, { new: true })
      .exec();
    return updatedRestaurant;
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().select('name brand _id').exec();
  }

  async findAllWithBrand(): Promise<Restaurant[]> {
    return this.restaurantModel
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

  async findAllWithSport(): Promise<Restaurant[]> {
    return this.restaurantModel
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

  async findByName(name: string): Promise<Restaurant[]> {
    return this.restaurantModel
      .find({ name: { $regex: new RegExp(name, 'i') } })
      .select('name brand _id')
      .exec();
  }

  async delete(id: string) {
    const deletedRestaurant = await this.restaurantModel
      .findByIdAndDelete(id)
      .exec();
    return deletedRestaurant;
  }
}
