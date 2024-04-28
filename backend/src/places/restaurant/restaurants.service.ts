import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantsService {
  constructor(@InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>) {}

  //   async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
  //     const createdRestaurant = await this.restaurantModel.create(createRestaurantDto);
  //     return createdRestaurant;
  //   }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().select('name brand _id').exec();
  }

  async findByName(name: string): Promise<Restaurant[]> {
    return this.restaurantModel.find({ name: { $regex: new RegExp(name, 'i') } }).select('name brand _id').exec();
  }

  //   async delete(id: string) {
  //     const deletedRestaurant = await this.restaurantModel
  //       .findByIdAndRemove({ _id: id })
  //       .exec();
  //     return deletedRestaurant;
  //   }
}
