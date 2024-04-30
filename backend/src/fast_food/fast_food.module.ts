import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Fast_Food, Fast_FoodSchema } from '../schemas/Fast_food.schema';
import { Fast_FoodsController } from './fast_food.controller';
import { Fast_FoodsService } from './fast_food.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Fast_Food.name, schema: Fast_FoodSchema },
    ]),
  ],
  controllers: [Fast_FoodsController],
  providers: [Fast_FoodsService],
  exports: [Fast_FoodsService],
})
export class Fast_FoodsModule {}
