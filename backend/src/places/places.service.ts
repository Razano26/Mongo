import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place } from './schemas/place.schema';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place.name) private readonly placeModel: Model<Place>,
  ) {}

  async findAllPlaces() {
    return await this.placeModel.find().exec();
  }

  async findPlacesByType(type: string) {
    return await this.placeModel.find({ type }).exec();
  }
}
