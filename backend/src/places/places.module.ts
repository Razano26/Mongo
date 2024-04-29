import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bar, BarSchema } from '../schemas/bar.schema';
import { Restaurant, RestaurantSchema } from '../schemas/restaurant.schema';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bar.name, schema: BarSchema }]),
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}