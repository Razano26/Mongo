import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Bar } from '../schemas/bar.schema';
import { Restaurant } from '../schemas/restaurant.schema';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Bar.name) private barModel: Model<Bar>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  // Méthode pour récupérer toutes les places dans tous les documents
  async findAll() {
    const bars = await this.barModel.find().select('name brand _id').exec();
    const restaurants = await this.restaurantModel
      .find()
      .select('name brand _id')
      .exec();
    return { bars, restaurants };
  }

  // Méthode pour récupérer une place par son nom
  async findPlaceByName(name: string) {
    const bars = await this.barModel
      .find({ name: { $regex: new RegExp(name, 'i') } })
      .select('name brand _id')
      .exec();
    const restaurants = await this.restaurantModel
      .find({ name: { $regex: new RegExp(name, 'i') } })
      .select('name brand _id')
      .exec();
    return { bars, restaurants };
  }

  async findPlaceIfBrand() {
    const bars = await this.barModel
      .find({ brand: { $ne: '' } })
      .select('name brand _id')
      .exec();
    const restaurants = await this.restaurantModel
      .find({ brand: { $ne: '' } })
      .select('name brand _id')
      .exec();
    return { bars, restaurants };
  }

  async findPlaceIfBrand2() {
    const bars = await this.barModel.aggregate([
      { $match: { brand: { $ne: '' } } },
      { $project: { name: 1, brand: 1, _id: 1 } },
    ]);

    const restaurants = await this.restaurantModel.aggregate([
      { $match: { brand: { $ne: '' } } },
      { $project: { name: 1, brand: 1, _id: 1 } },
    ]);

    return { bars, restaurants };
  }
  
  async findPlaceIfBrand3() {
    const result = await this.restaurantModel.aggregate([
      {
        $lookup: {
          from: 'bar',
          let: { bar_brand: '$brand' },
          pipeline: [],
          as: 'relatedBars',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          brand: 1,
          relatedBars: 1,
        },
      },
    ]);
    return result;
  }
}
