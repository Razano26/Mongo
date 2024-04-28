import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bar } from './bar/schemas/bar.schema';
import { Restaurant } from './restaurant/schemas/restaurant.schema';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Bar.name) private barModel: Model<Bar>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async getAll(): Promise<(Bar | Restaurant)[]> {
    const bars = await this.barModel.find();
  
    const restaurants = await this.restaurantModel.find();
  
    return [...bars, ...restaurants];
  }

}