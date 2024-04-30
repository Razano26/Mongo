// brand.module.ts
import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';

import { PubsModule } from 'src/pub/pubs.module';
import { BarsModule } from 'src/bar/bars.module';
import { RestaurantsModule } from 'src/restaurant/restaurants.module';
import { Fast_FoodsModule } from 'src/fast_food/fast_food.module';

@Module({
  imports: [PubsModule, BarsModule, RestaurantsModule, Fast_FoodsModule],
  controllers: [SportController],
  providers: [SportService],
})
export class SportModule {}
