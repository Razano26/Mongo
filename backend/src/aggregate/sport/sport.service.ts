import { Injectable } from '@nestjs/common';

import { PubsService } from 'src/pub/pubs.service';
import { BarsService } from 'src/bar/bars.service';
import { RestaurantsService } from 'src/restaurant/restaurants.service';
import { Fast_FoodsService } from 'src/fast_food/fast_food.service';

import { Pub } from '../../schemas/Pub.schema';
import { Bar } from '../../schemas/Bar.schema';
import { Restaurant } from '../../schemas/Restaurant.schema';
import { Fast_Food } from '../../schemas/Fast_food.schema';

@Injectable()
export class SportService {
  constructor(
    private readonly pubsService: PubsService,
    private readonly barsService: BarsService,
    private readonly restaurantsService: RestaurantsService,
    private readonly fast_FoodsService: Fast_FoodsService,
  ) {}

  async findAllWithSport(): Promise<(Pub | Bar | Restaurant | Fast_Food)[]> {
    const pubs = await this.pubsService.findAllWithSport();
    const bars = await this.barsService.findAllWithSport();
    const restaurants = await this.restaurantsService.findAllWithSport();
    const fastFoods = await this.fast_FoodsService.findAllWithSport();

    return [...pubs, ...bars, ...restaurants, ...fastFoods];
  }
}
